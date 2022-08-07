import Layout from '../components/layout/Layout'
import Login from '../components/auth/Login'
import axios from 'axios'

export default function LoginPage() {
  return (
    <Layout title="Login">
      <Login/>
    </Layout>
  )
}
