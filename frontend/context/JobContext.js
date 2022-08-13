import {useState, useEffect, createContext } from 'react';
import {useRouter} from 'next/router';


const JobContext = createContext()

export const JobProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [applied, setApplied] = useState(false);
    const [stats, setStats] = useState(false);


    const router = useRouter();

    //Applied to Job
    const applyToJob = async(id, access_token) => {
        try{
            
            setLoading(true);
            const res = await axios.post(`${process.env.API_URL}/api/jobs/${id}/apply/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });

            console.log(res.data)


            setLoading(false);
            setApplied(res.data);

            

        } catch(error) {
            console.log(error.response);
            setLoading(false);
            setError(
                error.response && 
                    (error.response.data.detail || error.response.data.error)
                );
            }
        };

    //Check job applied
    const checkJobApplied = async(id, access_token) => {
        try{
            
            setLoading(true);
            const res = await axios.get(`${process.env.API_URL}/api/jobs/${id}/check/`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });

            setApplied()

            if(res.data.applied === true){
                setLoading(false);
                setApplied(true);

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
    

    //Get topic stats
    const getTopicStats = async(topic) => {
        try{
            
            setLoading(true);
            const res = await axios.get(`${process.env.API_URL}/api/stats/${topic}/`,
            
            );

            setLoadiing(false);
            setStats(res.data);

        } catch(error) {
            console.log(error.response);
            setLoading(false);
            setError(
                error.response && 
                    (error.response.data.detail || error.response.data.error)
                );
            }
        };
        
    
    const clearError = () => {
        setError(null);
    };

    return (
        <JobContext.Provider
            value={{
                loading,
                error,
                updated,
                applied,
                stats,
                getTopicStats,
                applyToJob,
                setUpdated,
                checkJobApplied,
                clearError,
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export default JobContext;