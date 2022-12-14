import Layout from '../components/layout/Layout'
import Home from '../components/Home'
import axios from 'axios'

export default function Index({data}) {
  console.log("jobs", data);
  return (
    <Layout>
      <Home data={data}/>
    </Layout>
  )
}
export async function getServerSideProps({ query }) {
  const jobType = query.jobType || "";
  const education = query.education || "";
  const experience = query.experience || "";
  const keyword = query.keyword || "";
  const location = query.location || "";
  const page = query.page || 1;


  let min_salary = ""
  let max_salary = ""

  if(query.salary) {
    const [min, max] = query.salary.split("-");
    min_salary = min;
    max_salary = max;
  }

  const queryStr = `keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&min_salary=${min_salary}&max_salary=${max_salary}`;

  const res = await axios.get(`${process.env.API_URL}/api/jobs?${queryStr}`);
  const data = res.data;
  console.log("받기", data)
  return {
    props: {
      data
    },
  };
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