const userModel = require('../models/user.js')
const {qb} = require('../db/connectdb.js')
const md5 = require('md5');

const { access_level } = require('../utils/helpers');
const login = (req,res) => {
    // console.log(req.session);
    if(req.session.data){
        res.redirect('/user')
    }
    else{
    res.render('index',{msg:req.flash('error')});
    }

}

const submitLogin = async (req,res) => {
    
    const { URN} = req.body;
    const password = md5(req.body.password);
    // const qb = await pool.get_connection();
    const response = await qb.select('*')
            .where({URN: URN, password: password})
            .get('users')
    if(response.length >0){
        if(response[0].status == 'Inactive'){
            req.flash("error","You account have been deactivated.Please contact on 011-4122 1111")
            return res.redirect('/')
        }
        req.session.data = response[0];
        return res.redirect('/user')
    }
    else{
        req.flash("error","Wrong Credentials")
        return res.redirect('/')
    }
   
}

const userList = async (req,res) => {
    try {
        // const state = await stateModel.find()
        // const qb = await pool.get_connection();
        const state = await qb.get('master_state')
    
        res.render('userlist', {state,access_level});
        // res.render('userlist');
    } catch (error) {
        console.log(error);
    }
    
}
const addUser = async (req,res) => {
    var data = JSON.parse(req.body.data);
    console.log(data);
    try {
        // const qb = await pool.get_connection();
        var exist = await qb.where('email', data.email).or_where('phone_no',`${data.phone_no}`,true).get('users')
        
        if(exist.length){
            var response = {
                status : false,
                message: 'User Already exist'
            }
            res.send(response)
            return;    
        }
        var parent_id = '';
        if(!data.parent_id){
            parent_id = req.session.data.id
        }
        else
        {
            console.log(data);
            var parent = await qb.get_where('users',{URN:data.parent_id});
            if(!parent){
                var response = {
                    status : false,
                    message: 'Parent Not found'
                }
                res.send(response)
                return;
            }
            else
            {
                if(parent[0].access_level >= data.access_level){
                    var response = {
                        status : false,
                        message: 'Access Level of parent should be greater than current user'
                    }
                    res.send(response)
                    return;
                }
                else
                {
                    parent_id = parent[0].id
                }
            } 
        }
        const userDoc = await qb.returning('id').insert('users',{ 
            old_id:data.old_id,
            pan_no:data.pan_no,
            state:data.state.state,
            parent_id: parent_id,
            name: data.name,
            city:data.city,
            pincode: data.pincode,
            email:data.email,
            phone_no:data.phone_no,
            access_level:data.access_level,
            status:data.status,
        })
        // console.log(userDoc.insert_id);
        // return;
         const res_id = userDoc.insert_id
        URN = 'NXPAN'+ String("000000" + res_id).slice(-6);;
        password= md5(URN)

        await qb.update('users',{URN,password},{id:userDoc.insert_id});

        var response = {
            status : true,
            message: 'User Added Successfully'
        }
        return res.send(response)
        // console.log(getResult);
    } catch (error) {
        console.log(error);
        var response = {
            status : true,
            message: error
        }
        return res.send(response)
        
    }
}

const logout = (req,res) => {
    req.session.destroy(); 
    res.redirect("/")
    // res.render('userlist');
}

const getUserList = async (req,res) => {
    var request = JSON.parse(req.body.data);
    var searchField ='';
    var searchFieldData ='';
    // console.log(data);
    try {
        var where = {}
        var where1 = {}
        var data = req.session.data;
        where['a.access_level !='] = '1';
        if (data['access_level'] != '1') {
            where['a.parent_id'] =data['id'];
        }
        if(request['accessLevel']){
            where['a.access_level'] = request['accessLevel'];
        }
        if(request['searchField'] && request['searchFieldData']){
            searchField = 'a.'+request['searchField'];
            searchFieldData = request['searchFieldData'];
            if(request['searchField'] == 'parentURN'){
                where1['b.URN'] = searchFieldData;
            }
            else{
                where1[searchField] = searchFieldData;
            }
            qb.like(where1);
        }
        $offset = (request['currentPage']-1)*request['numPerPage'];
        $limit = request['numPerPage'];
        
        var result = await qb.select('a.id,a.name,a.URN,a.remarks,a.old_id,a.access_level,a.status,a.pan_no,a.email,a.phone_no,a.state,a.city,b.URN as parentURN')
        .from('users as a')
        .join('users as b','a.parent_id = b.id','left')
        .where(where)
        .order_by('a.id')
        .limit($limit,$offset)
        .get();

        var result1 = await qb.select('a.id,a.name,a.URN,a.remarks,a.old_id,a.access_level,a.status,a.pan_no,a.email,a.phone_no,a.state,a.city,b.URN as parentURN')
        .from('users as a')
        .join('users as b','a.parent_id = b.id','left')
        .where(where)
        .order_by('a.id')
        .get();
        var total = result1.length
        // const result = await userModel.find()
        response = {
            'success' : true,
            'login' : true,
            'data' : result,
            'total' : total,
        }
        
    } catch (error) {
        response = {
            'success' : false,
            'login' : false,
            'message' : error
        }
        console.log(error)
    }
    
    return res.send(response)
}

const editUser = async (req,res) => {
    var where = {}
    var where_v = {}
    var parent_id = '';
    if(req.session.data.access_level == '1'){
        var request = JSON.parse(req.body.data);
        console.log(request);
        where['email'] = request['email'];
        where['id !='] = request['user_id'];
        console.log(where);
        check = await qb.get_where('users',where);
        console.log(qb.last_query())
        if(check.length){
            response = {
                'success' : false,
                'message' : 'Email Id already used'
            }
            return res.send(response)
        }

        where_v['phone_no'] = request['phone_no'];
        where_v['id !='] = request['user_id'];
        check_v = await qb.get_where('users',where_v,(req,res) => {
            console.log(req);
            console.log(res);
        });
        if(check_v){
            response = {
                'success' : false,
                'message' : 'Phone Number already used'
            }
            return res.send(response)
        }
        if(!request.parent_id){
            parent_id = req.session.data.id
        }
        else
        {
            var parent = await qb.get_where('users',{URN:request.parent_id});
            if(!parent){
                var response = {
                    status : false,
                    message: 'Parent Not found'
                }
                res.send(response)
                return;
            }
            else
            {
                if(parent[0].access_level >= request.access_level){
                    var response = {
                        status : false,
                        message: 'Access Level of parent should be greater than current user'
                    }
                    res.send(response)
                    return;
                }
                else
                {
                    parent_id = parent[0].id
                }
            } 
        }

        ins = {
            "name" : request['name'],
            'email':request['email'],
            'old_id':request['old_id'],
            'pan_no':request['pan_no'],
            'access_level':request['access_level'],
            'phone_no':request['phone_no'],
            'status':request['status'],
            'parent_id':parent_id,
            'remarks':''        
        };
        if(request['status'] == 'Inactive'){
            ins['remarks'] = request['remarks'];
        }
        var isUpdate = await qb.update('users',ins,{'id':request['user_id']});
        console.log(isUpdate);
        if(isUpdate){
            return res.send({
                'status' : true,
                'message' : 'User detail edited Successfully'
            });
        }
        else{
            return res.send({
                'status' : true,
                'message' : 'User detail edited Successfully'
            });
        }
    }
    else{
        response = {
            'success' : false,
            'login' : false,
            'message' : error
        }
        return res.send(response)
    }
    
}

const changeUserPassword = async (req,res)=> {
    if(req.session.data.access_level == '1'){ 
        var request = JSON.parse(req.body.data);
        var isUpdate = await qb.update('users',{'password' : md5(request['URN'])},{'URN' : request['URN']})
        if(isUpdate){
            return res.send({
                'status' : true,
                'message' : 'Password Change Successfully'
            });
        }
        else{
            return res.send({
                'status' : false,
                'message' : 'Something went wrong'
            });
        }
    }
    else {
        return res.send({
            'status' : false,
            'message' : 'Not Authorized'
        });
    }

}

const getUserCommission = async (req,res) => {
    user_id = req.body.user_id;
    // $this->load->model('m_user');
    var comm ={};
    var uModel = new userModel()
    comm.rds = await uModel.getUserCommission(user_id);
    comm.de = await uModel.getUserCommissionDE(user_id);
    // console.log('comm');
    comm.dp = await uModel.getUserCommissionDP(user_id);
    return res.send(comm)
    // echo json_encode($comm);
}

const setUserCommission = async (req,res) => {
    try {
        var data = JSON.parse(req.body.data)
        var uModel = new userModel()
        var pre_val = await uModel.getUserCommission(data['rds']['user_id']);
        var upt = {
            'default_agent_commission' : '0',
            'AG_forPAN' : data['rds']['pan_commission'],
            'default_agent_commission_de' : '0',
            'AG_forPAN_de' : data['de']['pan_commission'],
            'default_agent_commission_dp' : '0',
            'AG_forPAN_dp' : data['dp']['pan_commission'],
        };
        var isUpdate = await qb.update('users',upt,{'id' : data['rds']['user_id']})
        if(isUpdate){
            await qb.update('user_settings',{'status' : '0'},{'user_id' : data['rds']['user_id']});
            var date = new Date();
            var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
            var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
            var insert = {
                'user_id' : data['rds']['user_id'],  
                'effectiveDate' : current_date+' '+current_time,  
                'entryby' : req.session.data.id,  
                'AG_forPAN' : data['rds']['pan_commission'],  
                'AG_forPAN_de' : data['de']['pan_commission'],  
                'AG_forPAN_dp' : data['dp']['pan_commission'],  
            };
            await qb.insert('user_settings',insert)
            return res.send({
                'success' : true,
                'message' : 'Package updated successfully'
            });
        }
        else
        {
            return res.send({
                'success' : false,
                'message' : 'problem in saving data'
            });
        }
    } catch (error) {
        return res.send({
            'success' : false,
            'message' :error
        });
    }
}

const getUserListExport = async (req,res) => {
    var request = JSON.parse(req.body.data);
    var searchField ='';
    var searchFieldData ='';
    try {
        var where = {}
        var where1 = {}
        var data = req.session.data;
        where['a.access_level !='] = '1';
        if (data['access_level'] != '1') {
            where['a.parent_id'] =data['id'];
        }
        if(request['accessLevel']){
            where['a.access_level'] = request['accessLevel'];
        }
        if(request['searchField'] && request['searchFieldData']){
            searchField = 'a.'+request['searchField'];
            searchFieldData = request['searchFieldData'];
            if(request['searchField'] == 'parentURN'){
                where1['b.URN'] = searchFieldData;
            }
            else{
                where1[searchField] = searchFieldData;
            }
            qb.like(where1);
        }
        var result = await qb.select('a.id,a.name,a.URN,a.remarks,a.old_id,a.access_level,a.status,a.pan_no,a.email,a.phone_no,a.state,a.city,b.URN as parentURN')
        .from('users as a')
        .join('users as b','a.parent_id = b.id','left')
        .where(where)
        .order_by('a.id')
        .get();
        response = {
            'success' : true,
            'login' : true,
            'data' : result,
        }
        
    } catch (error) {
        response = {
            'success' : false,
            'login' : false,
            'message' : error
        }
        console.log(error)
    }
    
    return res.send(response)
}

module.exports = { login, submitLogin, userList, getUserList, addUser, logout, editUser, changeUserPassword,
    getUserCommission,setUserCommission,getUserListExport}
// module.exports = { login, submitLogin, userList, logout, addUser, getUserList}
