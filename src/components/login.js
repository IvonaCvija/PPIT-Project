// sources: https://mdbootstrap.com/docs/standard/extended/login/

function Login() {
    return (
        <div>
            {/* <h1>Login page</h1> */}


            <section class="h-100 gradient-form">
                <div class="container py-5 h-100" style={{ backgroundColor: '#9be8ad' }}>
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-xl-10">
                            <div class="card rounded-3 text-black" style={{ backgroundColor: '#68d481' }}>
                                <div class="row g-0">
                                    <div class="col-lg-6">
                                        <div class="card-body p-md-5 mx-md-4">

                                            <div class="text-center">
                                                <img src="https://previews.123rf.com/images/biseeise/biseeise2401/biseeise240112124/222998403-house-structure-illustrationscountry-home-vector-designs.jpg"
                                                    style={{ maxWidth: '100%', height: 'auto' }} />

                                                <h4 class="mt-1 mb-5 pb-1">Housemates</h4>
                                            </div>
                                            <form>
                                                <p>Please login to your account</p>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input type="householdCode" id="formLogin" class="form-control"
                                                        placeholder="Household code" />
                                                    <label class="form-label" for="formLogin">Household</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input type="phoneNumber" id="formLogin" class="form-control"
                                                        placeholder="Phone number" />
                                                    <label class="form-label" for="formLogin">Phone number</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input type="password" class="form-control" autocomplete="off" />
                                                    <label class="form-label" for="formLogin">Password</label>
                                                </div>

                                                <div class="text-center pt-1 mb-5 pb-1">
                                                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Log
                                                        in</button>
                                                </div>

                                                <div class="d-flex align-items-center justify-content-center pb-4">
                                                    <p class="mb-0 me-2">Are you not a member yet?</p>
                                                    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-danger" href="/addhousemate">Create account</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div>


    )
}

export default Login;