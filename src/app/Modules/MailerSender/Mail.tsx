import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface EmailProps {
    name: string;
    email: string;
    message: string;
  }
  
  export const Email = ({ name, email, message }: EmailProps) => {
    const currentDateTime = new Date().toLocaleString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: false,
    });
    
    return (
      <Html>
        <Head />
        <Body style={main}>
          <Container style={container}>
            <Heading style={heading}>Contact Form</Heading>
            <Section style={body}>
              <Text style={paragraph}>
                Name: {name}
                <br />
                Email: {email}
                <br />
                Sent date and time: {currentDateTime}
              </Text>
              <Text style={paragraph}>
                Message:
                <br/>
                {message}
              </Text>
            </Section>
            <Hr style={hr} />
            <Text style={footer}>Adit.sk</Text>
          </Container>
        </Body>
      </Html>
    );
  };
  
  export default Email;
  
  const main = {
    backgroundColor: '#ffffff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 25px 48px',
    backgroundImage: 'url("/assets/raycast-bg.png")',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat, no-repeat',
  };
  
  const heading = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginTop: '48px',
  };
  
  const body = {
    margin: '24px 0',
  };
  
  const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
  };
  
  const link = {
    color: '#FF6363',
  };
  
  const hr = {
    borderColor: '#dddddd',
    marginTop: '48px',
  };
  
  const footer = {
    color: '#8898aa',
    fontSize: '12px',
    marginLeft: '4px',
  };
  