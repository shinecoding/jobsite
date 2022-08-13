import Layout from '../components/layout/Layout'
import TopicStats from '../components/stats/TopicStats'
import axios from 'axios'

export default function TopicStatsPage() {
  return (
    <Layout title="Get Topic Stats">
      <TopicStats/>
    </Layout>
  )
}
