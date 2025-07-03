const Home = (props) => {

  const {greeting, name} = props

  return <>
  <h1>Home</h1>
  <h3>{greeting}</h3>
  <h4>{name}</h4>
  </>
}

export default Home