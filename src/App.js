import React, {useEffect, useState} from 'react';
import  {Typography, Col, Row, Form,  Button, Input, message, Statistic} from 'antd';
import './App.css';



const { Title } = Typography;

const App = () => {

  const [ currentQuestion, setCurrentQuestion ] = useState( '' )//para renderizar la pregunta utilizamos current
  const [ totalPoints, setTotalPoints ] = useState( 0 );
  const [ points, setPoints ] = useState( 0 );


    useEffect( () => {
    getQuestion();//aqui llamamos a la funcion
  }, [totalPoints]);//como nosotros queremos que se ejecute al momento de cargar, pasamos el arreglo vacio
//como debemos ir a la siguiente pregunta vamos a reutilizar y es por eso que va fuera del useefect
    const getQuestion = async () => {    //agregamos una funcion
        const  questionResponse = await fetch('http://jservice.io/api/random')
        const questionJson = await questionResponse.json();

        console.log('questionJSON', questionJson) //podemos visualizar como hace la llamada al fetch
        setCurrentQuestion(questionJson[ 0 ]); //aqui el valor que va a tener va hacer las preguntas van hacer una a la vez en 0.
    };
  const  handleSubmit = ({ answer }) => {
      const questionvalue = currentQuestion.value
      ? currentQuestion.value
      : 100;
      if( answer === currentQuestion.answer ){
          console.log('correcto');
          setPoints( (prevState) => prevState + questionvalue)
          message.success('Correcto');
      }else{
          console.log('incorrecto');
          message.error('Incorrecto');
      }
      //siempre va a sumar el puntaje de todas las preguntas
      setTotalPoints( (prevState) => prevState + questionvalue)

  };


  return (
      // si tengo current question como es de una expresion es entre llaves
      <>
          <Row justify='center'>
              <Col span={ 12 } align='end'>
                  <Statistic title="Puntuación" value={points} suffix={ `/ ${totalPoints}` } />
              </Col>
          </Row>
        <Row justify='center'>
          <Col span={ 12 }>
            {
              currentQuestion //si tengo currec¿nt question
                  ? <Title>{currentQuestion.question}</Title>  //presenten currentquestion.question
              : 'Cargando Pregunta...' //caso contrario poner cargando pregunta
            }
          </Col>
        </Row>

        <Row justify='center'>
          <Col span={ 12 }>
            <Form onFinish={handleSubmit}>
              <Form.Item name='answer' label='Respuesta' rules={[
                  {
                   required: true,
                   message: 'Ingrese la Respuesta'
                  }
              ]}>
                  <Input/>
              </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Verificar Respuesta</Button>
                </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
  );

}

export default App;
