import React,{useState,useContext} from 'react';
import { Link,useHistory } from 'react-router-dom';
import styled from 'styled-components';
import spiderman from "../images/spiderman.png";
import {FirebaseContext} from '../backend/FirebaseContexte';
import {useForm,useFormState} from 'react-hook-form'








export default function Login() 
{
    let history=useHistory();
    // console.log(history);
    const{register,handleSubmit,watch,formState:{isValidating,isDirty,isSubmitSuccessful,isValid,isSubmitting}}=useForm({mode:'onChange'});
    /*const{isValid}=useFormState;
    console.log(isSubmitting);
    console.log(isSubmitSuccessful)
    console.log(isDirty)
    console.log(isValidating)
    */
   
    
    const firebase = useContext(FirebaseContext);
    const{loginUser}=firebase;
    const onSubmit=({email,password})=>
    {
        console.log(email,password);
        
        loginUser(email,password).then(connexion=>
        {
           history.push("./Welcome")
        })
        .catch((error)=>
        {
            console.log(error.message)
        })
        
    }
    
    

    /* const data=
    //     {
    //         email:'',
    //         password:''
    //     }
       

    // const [userLogin, setUserLogin] = useState(data);
    // const{email,password}=userLogin;
    // const handleChange=(e)=>
    // {
    //     e.preventDefault();
    //     setUserLogin({...userLogin,[e.target.id]:e.target.value});
        
        
    // };
    // console.log(userLogin)
    
    // const button=(password.length>5 && email!=="")?<Button type="submit" color="true">Connexion</Button>:<Button disabled>Connexion</Button>
    console.log(register("email"));
    console.log(errors)
    const onSubmit = ({email,password})=>{
        console.log(email);
        console.log(222)
    }*/
    return (
        <Wrapper>
            <Container>
                <Flex>
                    <Image>
                        <img src={spiderman} alt="ironman" />
                    </Image>
                    <FormContainer>
                        <h3>connexion</h3>
                        {/* <Form onSubmit={(e)=>{
                            e.preventDefault();
                            console.log(1)
                            }} > */}
                            <Form onSubmit={handleSubmit(onSubmit)}>
                            <input {...register("email",{required:true,pattern:/^\S+@\S+$/i})}  type='mail'  placeholder="Email"  id='email' autoComplete="off" />
                            {/* {(errors.email)&&<span className="alert">merci de remplir le champs</span>} */}
                            <input  {...register("password",{minLength:6,maxLength:16})} type='password' placeholder="password"  id='password'  />
                            {/* {(errors.email)&&<span className="alert">mot de passe compris entre 6 et 16 caractere</span>} */}
                            {/* {button} */}
                            {(isValid)?<Button color="true"  type="submit">connexion</Button>:<Button disabled>connexion</Button>}
                        </Form>
                        <div className='login'> <Link to="/signup">Nouveau sur Marvel Quiz ? S'inscrire maintenant</Link></div>
                    </FormContainer>
                    
                </Flex>
            </Container> 
        </Wrapper>
    )
};

const Wrapper=styled.div``;
const Container=styled.div``;
const Flex=styled.div`
    display:flex;
    flex-direction:column;
    grid-gap:1.5rem;
    color:${({theme})=>theme.white};
    h3
    {
        margin:0 1rem;
        text-transform:upperCase;
        font-weight:bold;
        
    }

    @media (min-width:768px)
    {
        flex-direction:row;
        align-items:center;
    }
`;
const Image=styled.div`
        flex:1`;
const FormContainer=styled.div`
        flex:1;
        p
        {
            border:1px solid red;
            color:red;
            text-align:center;
            font-size:1.4rem;
        }
        .login
        {
            border-top:3px dashed black;
            margin-top:1rem;
            color:black;
            padding:1rem 0;
            a{
                color:white;
                font-size:1.4rem;
            }
        }
`;
const Form=styled.form`
padding:0 1rem;
.alert
{
    display: inline-block;
    padding: .2rem;
    font-size: 1rem;
    text-transform: capitalize;
    color:#842029 ;
    background-color:#f8d7da ;
    border:1px solid #f8d7da;
    margin: .5rem 0;
}
input
{
    display:block;
    width:100%;
    color:${({theme})=>theme.white};
    background-color:transparent;
    outline:none;
    font-size:1.2rem;
    border:none;
    border-bottom:2px solid white; 
    margin:1rem 0;
    
}
`;
const Button=styled.button`
text-decoration:none;
font-size: 1em;
padding: 0.25em 1em;
border:none;
border-radius: 3px;
color:${({theme})=>theme.white};
background:${({theme,color})=>color&&theme.green};
cursor:pointer;
font-size:19px;
`;

