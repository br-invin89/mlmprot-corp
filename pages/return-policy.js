import Layout from "components/layouts/layout";
import ReturnPolicyHtml from "components/policy.contents/return-policy-html"

export default function ReturnPolicy() {
  return (
    <Layout pageTitle={'Return Policy'}>
      <div className='container return-policy' style={{ paddingTop: 40 }}>
        <ReturnPolicyHtml 
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