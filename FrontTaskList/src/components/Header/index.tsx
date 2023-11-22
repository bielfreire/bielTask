import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import BielIcon from '../../assets/BielLogo-full.svg';
import { AuthContext } from '../../Context/AuthContext';

export const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <Flex
      px={[4, 6, 12]}
      maxH="65px"
      align="center"
      justify={'space-between'}
      gap={10}
    >
      <Link
        href="/"
        textDecoration={'none'}
        _hover={{ textDecoration: 'none' }}
      >
        {' '}
        <Flex py={4} fontWeight={700}>
          <img src={BielIcon} alt="" width={80}/>
        </Flex>
      </Link>
      {user.name && (
        <Box>
          <Text as="p">
            Seja Bem Vindo,{' '}
            <Text as="span" fontWeight="bold">
              {String(user.name)}{' '}
            </Text>
            <Link
              href="/"
              textDecoration={'none'}
              _hover={{ textDecoration: 'none' }}
              fontSize={'sm'}
            >
              (sair)
            </Link>
          </Text>
        </Box>
      )}
    </Flex>
  );
};
