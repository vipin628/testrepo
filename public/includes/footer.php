<!-- PASSWORD CHANGE MODAL -->
<div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-orange">
                <h5 class="modal-title" id="changePasswordModalLabel">CHANGE PASSWORD</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="btn-group w-100">
                        <div class="form-item w-100">
                            <input type="text" id="currentPassword" autocomplete="off">
                            <label for="currentPassword">Current Password</label>
                        </div>
                        <div class="form-btn">
                            <button type="button" class="btn btn-success" disabled>
                                <i class="fi fi-rr-lock"></i>
                            </button>
                        </div>
                    </div>

                    <div class="btn-group w-100">
                        <div class="form-item w-100">
                            <input type="password" id="newPassword" autocomplete="off">
                            <label for="newPassword">New Password</span></label>
                        </div>
                        <div class="form-btn">
                            <button type="password" class="btn btn-success" disabled>
                                <i class="fi fi-rr-lock"></i>
                            </button>
                        </div>
                    </div>

                    <div class="btn-group w-100">
                        <div class="form-item w-100">
                            <input type="password" id="confirmPassword" autocomplete="off">
                            <label for="confirmPassword">Confirm Password</label>
                        </div>
                        <div class="form-btn">
                            <button type="button" class="btn btn-success" disabled>
                                <i class="fi fi-rr-lock"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="btn-group">
                    <button type="button" class="btn btn-success">Change
                        Password</button>
                    <button class="btn btn-success" disabled><i class="fi fi-rr-lock"></i></button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- PASSWORD CHANGE MODAL -->

<footer>
    <div>
        <p>Copyright © <span id="yearSpan"></span>. NationXpress All rights reserved.</p>
        <p>Powered by NationXpress | <a href="">Beware Of Frauds</a></p>
        <img src="assets/images/UTIITSL.png" alt="" width="80">
    </div>
</footer>
</div>
<!-- Main JS -->
<script src="assets/js/main.js"></script>

<!-- BOOTSTRAP SCRIPTS -->
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js"
    integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js"
    integrity="sha384-kjU+l4N0Yf4ZOJErLsIcvOU2qSb74wXpOhqTvwVx3OElZRweTnQ6d31fXEoRD1Jy" crossorigin="anonymous">
</script>
</body>

</html>