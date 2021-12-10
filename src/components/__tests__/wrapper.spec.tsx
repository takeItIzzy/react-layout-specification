import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Content, Wrapper } from '@/components';
import wrapper from 'root/__tests__/wrapper';

describe('setup test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return original children when the typeKey of Wrapper is not registered with RLSProvider', () => {
    const elements = [
      {
        typeKey: 'wrapper',
        order: ['content'],
      },
      {
        typeKey: 'content',
      },
    ];
    const { getByText } = render(
      <Wrapper typeKey="notWrapper">
        <div>inner</div>
      </Wrapper>,
      {
        wrapper: wrapper(elements),
      }
    );

    expect(getByText('inner')).toBeInTheDocument();
  });

  it('should return Content when the typeKey of Content is not registered with RLSProvider and order config has not been set', () => {
    const elements = [{ typeKey: 'wrapper' }];

    const { getByText } = render(
      <Wrapper typeKey="wrapper">
        <Content typeKey="content">I am Content</Content>
      </Wrapper>,
      {
        wrapper: wrapper(elements),
      }
    );

    expect(getByText('I am Content')).toBeInTheDocument();
  });

  it('should return Content when the typeKey of Content is not registered with RLSProvider and order config has been set', () => {
    const elements = [{ typeKey: 'wrapper', order: ['content'] }];

    const { getByText } = render(
      <Wrapper typeKey="wrapper">
        <Content typeKey="content">I am Content</Content>
      </Wrapper>,
      {
        wrapper: wrapper(elements),
      }
    );

    expect(getByText('I am Content')).toBeInTheDocument();
  });

  it('should not return Content when the typeKey of Content is not registered with order config', () => {
    const elements = [{ typeKey: 'wrapper', order: ['content'] }];

    const { queryByText } = render(
      <Wrapper typeKey="wrapper">
        <Content typeKey="notContent">I am notContent</Content>
      </Wrapper>,
      {
        wrapper: wrapper(elements),
      }
    );

    expect(queryByText('I am notContent')).not.toBeInTheDocument();
  });
});

describe('children boundary conditions test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // the testing of 'should return Content when children are only one Content' is done in the previous test

  it('should return Contents when children have two Contents', () => {
    const elements = [
      {
        typeKey: 'wrapper',
        order: ['content1', 'content2'],
      },
      { typeKey: 'content1' },
      { typeKey: 'content2' },
    ];

    const { getByText } = render(
      <Wrapper typeKey="wrapper">
        <Content typeKey="content1">I am Content1</Content>
        <Content typeKey="content2">I am Content2</Content>
      </Wrapper>,
      {
        wrapper: wrapper(elements),
      }
    );

    expect(getByText('I am Content1')).toBeInTheDocument();
    expect(getByText('I am Content2')).toBeInTheDocument();
  });

  it('should return Contents when children are an array', () => {
    const contents = ['content1', 'content2'];
    const elements = [
      {
        typeKey: 'wrapper',
        order: contents,
      },
      { typeKey: 'content1' },
      { typeKey: 'content2' },
    ];

    const { getByText } = render(
      <Wrapper typeKey="wrapper">
        {contents.map((content) => (
          <Content key={content} typeKey={content}>
            I am {content}
          </Content>
        ))}
      </Wrapper>,
      {
        wrapper: wrapper(elements),
      }
    );

    expect(getByText('I am content1')).toBeInTheDocument();
    expect(getByText('I am content2')).toBeInTheDocument();
  });

  it('should return Contents when children are nested array', () => {
    const contents = ['content1', 'content2'];
    const elements = [
      {
        typeKey: 'wrapper',
        order: contents.concat(['content3']),
      },
      { typeKey: 'content1' },
      { typeKey: 'content2' },
      { typeKey: 'content3' },
    ];

    const { getByText } = render(
      <Wrapper typeKey="wrapper">
        {contents.map((content) => (
          <Content key={content} typeKey={content}>
            I am {content}
          </Content>
        ))}
        <Content typeKey="content3">I am content3</Content>
      </Wrapper>,
      {
        wrapper: wrapper(elements),
      }
    );

    expect(getByText('I am content1')).toBeInTheDocument();
    expect(getByText('I am content2')).toBeInTheDocument();
    expect(getByText('I am content3')).toBeInTheDocument();
  });

  it('should ignore React.Fragment', () => {
    const contents = ['content1', 'content2'];
    const elements = [
      {
        typeKey: 'wrapper',
        order: contents.concat(['content3']),
      },
      { typeKey: 'content1' },
      { typeKey: 'content2' },
      { typeKey: 'content3' },
    ];

    const { getByText } = render(
      <Wrapper typeKey="wrapper">
        <>
          {contents.map((content) => (
            <Content key={content} typeKey={content}>
              I am {content}
            </Content>
          ))}
        </>
        <Content typeKey="content3">I am content3</Content>
      </Wrapper>,
      {
        wrapper: wrapper(elements),
      }
    );

    expect(getByText('I am content1')).toBeInTheDocument();
    expect(getByText('I am content2')).toBeInTheDocument();
    expect(getByText('I am content3')).toBeInTheDocument();
  });

  it('should return Content when Wrapper are nested', () => {
    const elements = [
      {
        typeKey: 'wrapper1',
        order: ['content1', 'content2'],
      },
      { typeKey: 'content1' },
      { typeKey: 'content2' },
      {
        typeKey: 'wrapper2',
        order: ['content3'],
      },
      { typeKey: 'content3' },
    ];

    const { getByText } = render(
      <Wrapper typeKey="wrapper1">
        <Content typeKey="content1">I am content1</Content>
        <Content typeKey="content2">
          I am content2
          <div>
            <Wrapper typeKey="wrapper2">
              <Content typeKey="content3">I am content3</Content>
            </Wrapper>
          </div>
        </Content>
      </Wrapper>,
      {
        wrapper: wrapper(elements),
      }
    );

    expect(getByText('I am content1')).toBeInTheDocument();
    expect(getByText('I am content2')).toBeInTheDocument();
    expect(getByText('I am content3')).toBeInTheDocument();
  });

  it('should ignore not-Content children', () => {
    const elements = [
      {
        typeKey: 'wrapper',
        order: ['content1', 'content2'],
      },
      { typeKey: 'content1' },
      { typeKey: 'content2' },
    ];

    const { getByText, queryByText } = render(
      <Wrapper typeKey="wrapper">
        <Content typeKey="content1">I am Content1</Content>
        <div>
          <Content typeKey="content2">I am Content2</Content>
        </div>
      </Wrapper>,
      {
        wrapper: wrapper(elements),
      }
    );

    expect(getByText('I am Content1')).toBeInTheDocument();
    expect(queryByText('I am Content2')).not.toBeInTheDocument();
  });
});
