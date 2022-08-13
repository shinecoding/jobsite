import {useState, useEffect, createContext } from 'react';
import {useRouter} from 'next/router';


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [uploaded, setUploaded] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if(!user) {
            loadUser()
        }
    }, [user]);


    //Login user
    const login = async({username, password}) => {
        try{
            
            setLoading(true)
            const res = await axios.post('/api/auth/login',{
                username,
                password
            })
            if(res.data.success){
                setIsAuthenticated(true);
                setLoading(false);
                router.push('/')
            }

        } catch(error) {
            
            setLoading(false);
            setError(
                error.response && 
                    (error.response.data.detail || error.response.data.error)
                );
            }
        };


    //Register user
    const register = async({fistName, lastName, email, password}) => {
        try{
            
            setLoading(true)
            const res = await axios.post(`${process.env.API_URL}/api/register/`,{
                first_name: firstName,
                last_name: lastName,
                email,
                password
            })

            console.log(res.data)

            if(res.data.message){
                setLoading(false);
                router.push('/login')
            }

        } catch(error) {
            console.log(error.response);
            setLoading(false);
            setError(
                error.response && 
                    (error.response.data.detail || error.response.data.error)
                );
            }
        };

    //Update user
    const updateProfile = async({fistName, lastName, email, password}, access_token) => {
        try{
            
            setLoading(true)
            const res = await axios.post(`${process.env.API_URL}/api/me/update/`,{
                first_name: firstName,
                last_name: lastName,
                email,
                password
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            })

            console.log(res.data)

            if(res.data.message){
                setLoading(false);
                setUpdated(true);
                router.push('/login')
            }

        } catch(error) {
            console.log(error.response);
            setLoading(false);
            setError(
                error.response && 
                    (error.response.data.detail || error.response.data.error)
                );
            }
        };


    //Upload resume
    const uploadResume = async(formData, access_token) => {
        try{
            
            setLoading(true)
            const res = await axios.post(`${process.env.API_URL}/api/me/resume/`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            })

            console.log(res.data)

            if(res.data.message){
                setLoading(false);
                setUploaded(true);

            }

        } catch(error) {
            console.log(error.response);
            setLoading(false);
            setError(
                error.response && 
                    (error.response.data.detail || error.response.data.error)
                );
            }
        };

    //Logout user
    const logout = async() => {
        try{
            
            const res = await axios.post('/api/auth/logout');

            if(res.data.success){
                setIsAuthenticated(false);
                setUser(null);
            }

        } catch(error) {
            console.log(error.response)
            setLoading(false);
            setIsAuthenticated(false);
            setUser(null);
            setError(
                error.response && 
                    (error.response.data.detail || error.response.data.error)
                );
            }
        };

    //Load user
    const loadUser = async() => {
        try{
            
            setLoading(true)
            const res = await axios.post('/api/auth/user');

            if(res.data.user){
                loadUser();
                setIsAuthenticated(true);
                setLoading(false);
                setUser(res.data.user)
            }

        } catch(error) {

            setLoading(false);
            setIsAuthenticated(false);
            setUser(null);
            setError(
                error.response && 
                    (error.response.data.detail || error.response.data.error)
                );
            }
        };

    //Clear Errors
    const clearError = () => {
        setError(null);
    }

    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                error,
                isAuthenticated,
                updated,
                uploaded,
                login,
                register,
                updateProfile,
                logout,
                setUpdated,
                setUploaded,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;