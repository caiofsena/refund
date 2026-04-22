import { tv } from 'tailwind-variants';
import Container from '../components/container';

const mainVariants = tv({
  base: 'flex flex-col min-h-screen bg-gray-100'
})

interface MainContentProps extends Omit<React.ComponentProps<'main'>, 'ref'> {}

export default function MainContent({children, className, ...props}: MainContentProps) {
  return (
    <Container as='main' className={mainVariants({className})} {...props}>
      {children}
    </Container>
  );
}