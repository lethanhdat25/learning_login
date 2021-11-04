import {useDispatch} from "react-redux";
import {login} from "../store/slices/auth";
import css from './Login.module.css';
import {Formik} from "formik";
import * as yup from 'yup';
import {useHistory} from 'react-router-dom'
import {useState} from "react";
import {unwrapResult} from "@reduxjs/toolkit";
const Login = () => {

    const [submitError,setSubmitError]=useState(false);
    const history=useHistory();
    const dispatch=useDispatch();
    const schema=yup.object().shape(
        {
            email:yup.string().required().email(),
            password:yup.string().required().min(6)
        }
    )

    return (
        <main className={css.auth}>
            <section>
                <Formik initialValues={{
                    email: "",
                    password: ""
                }} onSubmit={ async (values,{resetForm}) => {
                    try {
                        const res = await dispatch(login({
                            email: values.email,
                            password: values.password
                        }))
                        unwrapResult(res);
                        history.push("/")
                        resetForm();
                    }catch (e){
                        setSubmitError(true)
                    }
                }} validationSchema={schema}>
                    {({values, handleBlur, handleChange, handleSubmit, touched, errors}) => {
                        return(
                            <>
                            {submitError && <div>Email or Password</div>}
                            <form onSubmit={handleSubmit}>
                                <div className={css.control}>
                                    <label htmlFor={'email'}>Email</label>
                                    <input value={values.email} type={"text"} id={"email"} name={"email"} onBlur={handleBlur}
                                           onChange={handleChange}/>
                                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                </div>
                                <div className={css.control}>
                                    <label htmlFor={'password'}>Password</label>
                                    <input value={values.password} type={"password"} id={"password"} name={"password"} onBlur={handleBlur}
                                           onChange={handleChange}/>
                                    {errors.password && touched.password ? <div>{errors.password}</div> : null}
                                </div>
                                <button type={"submit"}>LOGIN</button>
                            </form>
                            </>
                        )
                    }}
                </Formik>
            </section>
        </main>
    )
}
export default Login;