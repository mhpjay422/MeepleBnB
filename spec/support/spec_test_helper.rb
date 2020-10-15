module SpecTestHelper   
  def login_admin
    login(:admin)
  end

  def login(user)
    user.reset_session_token!
    session = { session_token: user.session_token}
    allow_any_instance_of(ApplicationController).to receive(:session).and_return(session)
  end

  def current_user
    User.find(request.session[:user])
  end
end