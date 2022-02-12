/* import { useState, useHistory } from "react";
import axios from 'axios';
import './assets/auth.css'

export default function SignIn() {

  const [labelEmail, setEmailLabel]=useState('Email Address');
  const [labelPassword, setPasswordLabel]=useState('Password');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  //const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {email, password};
    axios.post('/login', data)
    .then((res)=>{
      //console.log(res.data);
        if(res.data.user){
         // history.push('/');
        }else{
          setEmailLabel(res.data.errors.email);
          setPasswordLabel(res.data.errors.password);
        }
      })
  };

  return (
    <div class="container">
		<div class="screen">
			<div class="screen__content">
				<form class="login">
					<div class="login__field">
						<i class="login__icon fa fa-user"></i>
						<input 
							type="text" 
							class="login__input" 
							placeholder="Email" 
							onChange={(e)=>handleSubmit(e)}
							value={email}
							/>
							<p>{email}</p>
					</div>
					<div class="login__field">
						<i class="login__icon fa fa-lock"></i>
						<input 
							type="password"
							class="login__input" 
							placeholder="Password" 
							onChange={(e)=>handleSubmit(e.target.value)} 
							value={password}
							/>
					</div>
					<button class="button login__submit">
						<span class="button__text">Log In Now</span>
						<i class="button__icon fa fa-chevron-right"></i>
					</button>	
					<button class="button login__submit">
						<span class="button__text">Regsiter Now</span>
						<i class="button__icon fa fa-chevron-right"></i>
					</button>		
				</form>
			</div>
			<div class="screen__background">
				<span class="screen__background__shape screen__background__shape4"></span>
				<span class="screen__background__shape screen__background__shape3"></span>		
				<span class="screen__background__shape screen__background__shape2"></span>
				<span class="screen__background__shape screen__background__shape1"></span>
			</div>		
		</div>
	</div>
  );
} */