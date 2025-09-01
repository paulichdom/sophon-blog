import { IconBrandGithub } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Button, Container, Text } from '@mantine/core';
import { SOURCE_CODE_URL } from '@/shared/constants';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Link to="/" className={classes.logo}>
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: '#F5EEC1', to: '#F9D87E', deg: 145 }}
          >
            Sophon
          </Text>
        </Link>
        <Button
          classNames={{ root: classes.button }}
          component="a"
          target="_blank"
          color="#5A8DEE"
          href={SOURCE_CODE_URL}
          leftSection={<IconBrandGithub size={18} stroke={1.5} />}
          variant="transparent"
        >
          Source code
        </Button>
      </Container>
    </div>
  );
}
