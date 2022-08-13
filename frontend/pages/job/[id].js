import Layout from '../../components/layout/Layout';
import JobDetails from '../../components/job/JobDetails';
import NotFound from "../../components/layout/NotFound";
import axios from 'axios';


export default function JobDetailsPage({data, access_token, error}) {
    console.log("에러", error)

    if (error?.includes('Not found.')) {
        return <NotFound/>;
    }

    return (
        <Layout title={data.title}>
            <h1>Job Details</h1>
            <JobDetails job={data} access_token={access_token}/>
            {/* <JobDetails data={job} candidates={candidates} />
             */}
        </Layout>
  )
}

export async function getServerSideProps({ req, params }) {

    try {
        console.log("각자", params)
        console.log(`${process.env.API_URL}/api/job/${params.id}/`)
        const res = await axios.get(`${process.env.API_URL}/api/job/${params.id}/`)
        // console.log("페이지아이디" , res.data)
        const data = res.data
        const job = res.data.job;
        const candidates = res.data.candidates;

        const access_token = req.cookies.access || '';

        return {
            props: {
                job,
                candidates,
                access_token
            }
        }
        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.log(error.response.data);
        return {
            props: {
                error: error.response.data.detail
            }
        }
    }


    
}