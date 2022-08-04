import Layout from '../../components/layout/Layout';
import JobDetails from '../../components/job/JobDetails';
import NotFound from "../../components/layout/NotFound";
import axios from 'axios';


export default function JobDetailsPage({data, error}) {
    console.log("에러", error)

    if (error?.includes('Not found.')) {
        return <NotFound/>;
    }

    return (
        <Layout title={data.title}>
            <h1>Job Details</h1>
            <JobDetails job={data}/>
            {/* <JobDetails data={job} candidates={candidates} />
             */}
        </Layout>
  )
}

export async function getServerSideProps({ params }) {

    try {
        console.log("각자", params)
        console.log(`${process.env.API_URL}/api/job/${params.id}/`)
        const res = await axios.get(`${process.env.API_URL}/api/job/${params.id}/`)
        // console.log("페이지아이디" , res.data)
        const data = res.data
        // const job = res.data.job;
        // const candidates = res.data.candidates;
        // return {
        //     props: {
        //         job,
        //         candidates
        //     }
        // }
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