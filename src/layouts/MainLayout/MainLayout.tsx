import Footer from '~/components/Foooter'
import Header from '~/components/Header'

interface Props {
  children?: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
