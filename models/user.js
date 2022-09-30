const {qb} = require('../db/connectdb.js')
class userModel {
    async getUserCommission(user_id) {
        qb.select('access_level,parent_id,default_agent_commission,AG_forPAN');
        var user = await qb.get_where('users', {'id' : user_id});
        user = user[0]
        if (user.length == 0) { 
            return false;
        }
        var default_agent_commission = user['default_agent_commission'] == '1';
        //  return 'sdsdsd';
        var data = this.userDefaultCommission();
        var maxagentcapping = default_agent_commission ? data['AG_forPAN'] : user['AG_forPAN'];
        var agentcomm= default_agent_commission ? data['AG_forPAN'] : user['AG_forPAN'];
        if(user['parent_id'] != 0){
            var c = await this.getUserCommission1(user['parent_id']);
            maxagentcapping = c['config']['pan_commission']['max'];
            agentcomm = (default_agent_commission || agentcomm > maxagentcapping) ? maxagentcapping : agentcomm;
        }
        return {
            'user_id' : user_id, 
            'access_level' : user['access_level'],
            'parent_id' : user['parent_id'],
            'agentcom_type' : default_agent_commission ? 'Default' : 'Manual',
            'pan_commission' : agentcomm,
            'config' : {
                'pan_commission' : {
                    'min' : 1,
                    'max' : maxagentcapping
                }
            }
        };
    }

    userDefaultCommission() {
        return {
            'AG_forPAN' : '7',
            'PGOnErs' : '',
            'config' : {
                'AG_forPAN' : {
                    'min' : 1,
                    'max' : 7
                }
            }
        };
    }

    async getUserCommission1(user_id) {
        qb.select('access_level,parent_id,default_agent_commission,AG_forPAN');
        var user = await qb.get_where('users', {'id' : user_id});
        user = user[0]
        if (!user) { 
            return false;
        }
        var default_agent_commission = user['default_agent_commission'] == '1';
        var data = this.userDefaultCommission();
        var maxagentcapping = default_agent_commission ? data['AG_forPAN'] : user['AG_forPAN'];
        var agentcomm= default_agent_commission ? data['AG_forPAN'] : user['AG_forPAN'];
        if(user['parent_id'] != 0){
            var c = await this.getUserCommission1(user['parent_id']);
            if(c['pan_commission'] < maxagentcapping){
                maxagentcapping = c['pan_commission'];
            }
        }
        return {
            'user_id' : user_id, 
            'access_level' : user['access_level'],
            'parent_id' : user['parent_id'],
            'agentcom_type' : default_agent_commission ? 'Default' : 'Manual',
            'pan_commission' : agentcomm,
            'config' : {
                'pan_commission' : {
                    'min' : 1,
                    'max' : maxagentcapping
                }
            }
        };
    }

    async getUserCommissionDE(user_id) {
        qb.select('access_level,parent_id,default_agent_commission_de,AG_forPAN_de');
        var user = await qb.get_where('users', {'id' : user_id});
        user = user[0]
        if (!user) { 
            return false;
        }
        var default_agent_commission = user['default_agent_commission_de'] == '1';
        var data = this.userDefaultCommissionDE();
        var maxagentcapping = default_agent_commission ? data['AG_forPAN_de'] : user['AG_forPAN_de'];
        var agentcomm= default_agent_commission ? data['AG_forPAN_de'] : user['AG_forPAN_de'];
        if(user['parent_id'] != 0){
            var c = await this.getUserCommission1DE(user['parent_id']);
            // console.log(c);
            maxagentcapping = c['config']['pan_commission']['max'];
            agentcomm = (default_agent_commission || agentcomm > maxagentcapping) ? maxagentcapping : agentcomm;
        }
        return {
            'user_id' : user_id, 
            'access_level' : user['access_level'],
            'parent_id' : user['parent_id'],
            'agentcom_type' : default_agent_commission ? 'Default' : 'Manual',
            'pan_commission' : agentcomm,
            'config' : {
                'pan_commission' : {
                    'min' : 1,
                    'max' : maxagentcapping
                }
            }
        };
    }

    userDefaultCommissionDE() {
        return {
            'AG_forPAN_de' : '4',
            'PGOnErs' : '',
            'config' : {
                'AG_forPAN_de' : {
                    'min' : 1,
                    'max' : 4
                }
            }
        };
    }

    async getUserCommission1DE(user_id) {
        // console.log(user_id)
        qb.select('access_level,parent_id,default_agent_commission_de,AG_forPAN_de');
        var user = await qb.get_where('users', {'id' : user_id});
        user = user[0]
        if (!user) { 
            return false;
        }
        var default_agent_commission = user['default_agent_commission_de'] == '1';
        var data = this.userDefaultCommissionDE();
        var maxagentcapping = default_agent_commission ? data['AG_forPAN_de'] : user['AG_forPAN_de'];
        var agentcomm= default_agent_commission ? data['AG_forPAN_de'] : user['AG_forPAN_de'];
        if(user['parent_id'] != 0){
            var c = this.getUserCommission1DE(user['parent_id']);
            if(c['pan_commission'] < maxagentcapping){
                maxagentcapping = c['pan_commission'];
            }
        }
        return {
            'user_id' : user_id, 
            'access_level' : user['access_level'],
            'parent_id' : user['parent_id'],
            'agentcom_type' : default_agent_commission ? 'Default' : 'Manual',
            'pan_commission' : agentcomm,
            'config' : {
                'pan_commission' : {
                    'min' : 1,
                    'max' : maxagentcapping
                }
            }
        };
    }

    async getUserCommissionDP(user_id) {
        qb.select('access_level,parent_id,default_agent_commission_dp,AG_forPAN_dp');
        var user = await qb.get_where('users',{'id' : user_id});
        user = user[0]
        if (!user) { 
            return false;
        }
        var default_agent_commission = user['default_agent_commission_dp'] == '1';
        var data = this.userDefaultCommissionDP();
        var maxagentcapping = default_agent_commission ? data['AG_forPAN_dp'] : user['AG_forPAN_dp'];
        var agentcomm= default_agent_commission ? data['AG_forPAN_dp'] : user['AG_forPAN_dp'];
        if(user['parent_id'] != 0){
            var c = await this.getUserCommission1DP(user['parent_id']);
            maxagentcapping = c['config']['pan_commission']['max'];
            agentcomm = (default_agent_commission || agentcomm > maxagentcapping) ? maxagentcapping : agentcomm;
        }
        return {
            'user_id' : user_id, 
            'access_level' : user['access_level'],
            'parent_id' : user['parent_id'],
            'agentcom_type' : default_agent_commission ? 'Default' : 'Manual',
            'pan_commission' : agentcomm,
            'config' : {
                'pan_commission' : {
                    'min' : 1,
                    'max' : maxagentcapping
                }
            }
        };
    }

    userDefaultCommissionDP() {
        return {
            'AG_forPAN_dp' : '4',
            'PGOnErs' : '',
            'config' : {
                'AG_forPAN_dp' : {
                    'min' : 1,
                    'max' : 4
                }
            }
        };
    }

    async getUserCommission1DP(user_id) {
        qb.select('access_level,parent_id,default_agent_commission_dp,AG_forPAN_dp');
        var user = await qb.get_where('users', {'id' : user_id});
        user = user[0]
        if (!user) { 
            return false;
        }
        var default_agent_commission = user['default_agent_commission_dp'] == '1';
        var data = this.userDefaultCommissionDP();
        var maxagentcapping = default_agent_commission ? data['AG_forPAN_dp'] : user['AG_forPAN_dp'];
        var agentcomm= default_agent_commission ? data['AG_forPAN_dp'] : user['AG_forPAN_dp'];
        if(user['parent_id'] != 0){
            var c = await this.getUserCommission1DP(user['parent_id']);
            if(c['pan_commission'] < maxagentcapping){
                maxagentcapping = c['pan_commission'];
            }
        }
        return {
            'user_id' : user_id, 
            'access_level' : user['access_level'],
            'parent_id' : user['parent_id'],
            'agentcom_type' : default_agent_commission ? 'Default' : 'Manual',
            'pan_commission' : agentcomm,
            'config' : {
                'pan_commission' : {
                    'min' : 1,
                    'max' : maxagentcapping
                }
            }
        };
    }
}

module.exports = userModel