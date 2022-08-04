import Layout from '../components/layout/Layout'
import Search from '../components/layout/Search'
import axios from 'axios'

export default function Index() {
  console.log("jobs");
  return (
    <Layout title="Search your jobs">
      <Search/>
    </Layout>
  )
}
