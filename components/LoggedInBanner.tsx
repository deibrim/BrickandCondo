import { Tag } from '@chakra-ui/react';
import React from 'react'; 

export const LoggedInBanner = ({email}:{email:object}) => { 
  return ( 
    <Tag
      w={{lg:'fit-content', base:'fit-content'}}
      bg='secondary.100'
      color='white'
      fontFamily='ProductBold'
      py={{lg:4, base: 6}}
      px={{lg:4, base: 4}}
      my={{lg: 8}}
      fontSize={{base: '15px'}}
    >
      Logged in as: {email?.email}
    </Tag>
  )
}