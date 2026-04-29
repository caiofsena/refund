import Container from '../components/container';
import Icon, { type IconProps } from '../components/icon';
import Text from '../components/text';

interface RequestItemProps {
  icon?: IconProps['svg'];
  title: string;
  description?: string;
  currency?: string;
  onClick?: () => void;
}

export default function RequestItem({ icon, title, description, currency, onClick }: RequestItemProps) {
  const content = (
    <>
      {icon && <Icon svg={icon} background='filled' />}
      <Container className='flex flex-col flex-1 gap-1 ml-3'>
        <Text variant='body-md-bold'>{title}</Text>  
        {description && <Text variant='body-sm-regular'>{description}</Text>}
      </Container>
      {currency && 
        <>
          <Text variant='body-sm-regular'>R$</Text>
          <Text variant='body-md-semibold' className='ml-1'>{currency}</Text>
        </>
      }
    </>
  );

  if (onClick) {
    return (
      <button
        type='button'
        onClick={onClick}
        className='flex w-full items-center text-left cursor-pointer'
      >
        {content}
      </button>
    );
  }

  return (
    <Container className='flex items-center'>
      {content}
    </Container>
  )
}
