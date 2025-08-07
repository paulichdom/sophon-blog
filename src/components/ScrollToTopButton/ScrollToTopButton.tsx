import { IconArrowUp } from '@tabler/icons-react';
import { Affix, Button, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

export const ScrollToTopButton = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            leftSection={<IconArrowUp size={16} />}
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            Scroll to top
          </Button>
        )}
      </Transition>
    </Affix>
  );
};
