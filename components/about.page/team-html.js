const members = [
  {
    image: 'images/Rectangle31.png',
    name: 'Gavin Dickson',
    title: 'Founder'
  },
  {
    image: 'images/Rectangle31.png',
    name: 'Scott Gordan',
    title: 'Legal'
  },
  {
    image: 'images/Rectangle31.png',
    name: 'Ryan Davies',
    title: 'Chief Revenue Officer'
  },
  {
    image: 'images/Rectangle31.png',
    name: 'Justin Biggs',
    title: 'Chief Technology Officer'
  },
  {
    image: 'images/Rectangle31.png',
    name: 'Scott Lazzerson',
    title: 'Public Relations and Marketing'
  },
  {
    image: 'images/Rectangle31.png',
    name: 'Rachel Vite',
    title: 'Client Concierge'
  },
]

export default function TeamHtml() {
  
  return (
    <section id="team-bar">
      <div class="container">
        {members.map(el => 
          <MemberCard member={el}
          />
        )}
      </div>
    </section>
  )
}

const MemberCard = props => {
  return (
    <div className="col-sm-3 col-xs-6">
      <img src={props.member.image} />
      <h3>{props.member.name}</h3>
      <h5>{props.member.title}</h5>
    </div>
  )
}
