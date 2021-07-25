import Layout from "components/layouts/layout";
import PrivacyPolicyHtml from "components/policy.contents/privacy-policy-html"

export default function ReturnPolicy() {
  return (
    <Layout pageTitle={'Privacy Policy'}>
      <div className='container return-policy' style={{ paddingTop: 40 }}>
        <PrivacyPolicyHtml 
        />
        <style jsx global>{`
          h2 {
            font-size: 20px;
          }
          h3 {
            font-size: 16px;
          }
        `}</style>
      </div>
    </Layout>
  )
}