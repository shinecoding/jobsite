import Layout from '../../components/layout/Layout'
import JobsApplied from '../../components/job/JobsApplied'
import axios from 'axios'
import {isAuthenticatedUser} from '../../utils/isAuthenticated'

export default function JobsAppliedPage({access_token}) {
    console.log(jobs);

  return (
    <Layout title="Jobs Applied">
      <JobsApplied access_token={access_token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {

    const access_token = req.cookies.access

    const user = await isAuthenticatedUser(access_token);

    if(!user){
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const res = await axios.get(`${process.env.API_URL}/api/me/jobs/applied/`, {
        header : {
            Authorization: `Bearer ${access_token}`
        }
    })
  
    const jobs = res.data

    return {
        props: {
            jobs,
        }
    }
    


    
}