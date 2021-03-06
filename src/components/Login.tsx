import React, { SyntheticEvent } from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import history from "../utils/history";

interface LoginProps {
  authService: AuthService;
  setUser: (user: User) => void;
}

interface LoginState {
  userName: string;
  password: string;
  loginAttempted: boolean;
  loginSuccess: boolean;
}

interface CustomEvent {
  target: HTMLInputElement;
}

export class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    userName: "",
    password: "",
    loginAttempted: false,
    loginSuccess: false,
  };

  private setUserName(event: CustomEvent) {
    this.setState({ userName: event.target.value });
  }

  private setPassword(event: CustomEvent) {
    this.setState({ password: event.target.value });
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    this.setState({ loginAttempted: true });
    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    );
    if (result) {
      this.setState({ loginSuccess: true });
      this.props.setUser(result);
      history.push("/profile");
    } else {
      this.setState({ loginSuccess: false });
    }
  }

  render() {
    let loginMessage: any;
    if (this.state.loginAttempted && this.state.loginSuccess) {
      loginMessage = <label>Login Succesful</label>;
    } else {
      loginMessage = <label>Login Failed</label>;
    }

    return (
      <div>
        <h2>Por favor, inicia sesión</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            value={this.state.userName}
            onChange={(e) => this.setUserName(e)}
          />
          <br />
          <input
            type="password"
            value={this.state.password}
            onChange={(e) => this.setPassword(e)}
          />
          <br />
          <input type="submit" value="Iniciar Sesión" />
        </form>
        {loginMessage}
      </div>
    );
  }
}
