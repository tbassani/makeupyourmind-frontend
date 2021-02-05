import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import DynamicSelect from '../components/common/DynamicSelect.js';
import { useApp } from '../context/AppContext.js';
import { useUser } from '../context/UserContext.js';

const ProfilePage = (props) => {
  const { skinProfiles } = useApp();
  const { getUserProfile, profile, setUserProfile } = useUser();

  const [initialColor, setInitialColor] = useState('');
  const [initialAcne, setInitialAcne] = useState('');
  const [initiaLines, setInitialLines] = useState('');
  const [initialOiliness, setInitialOiliness] = useState('');
  const [color, setColor] = useState('');
  const [acne, setAcne] = useState('');
  const [lines, setLines] = useState('');
  const [oiliness, setOiliness] = useState('');
  const [skinTypes, setSkinTypes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setTypes = async () => {
      await getUserProfile();
      setLoading(false);
    };
    setTypes();
  }, []);

  useEffect(() => {
    setSkinTypes(skinProfiles);
  }, [skinProfiles]);

  useEffect(() => {
    for (const key in profile) {
      setInitialColor(profile.skin_color_id);
      setInitialOiliness(profile.skin_oiliness_id);
      setInitialLines(profile.skin_lines_id);
      setInitialAcne(profile.skin_acne_id);
      setColor(profile.skin_color_id);
      setOiliness(profile.skin_oiliness_id);
      setLines(profile.skin_lines_id);
      setAcne(profile.skin_acne_id);
    }
  }, [profile]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const resp = await setUserProfile({
      skin_color: color,
      skin_acne: acne,
      skin_oiliness: oiliness,
      skin_lines: lines,
    });
    if (resp) {
      props.history.push('/');
    }
  };

  const colorHandler = (val) => {
    setColor(val);
  };
  const acneHandler = (val) => {
    setAcne(val);
  };
  const linesHandler = (val) => {
    setLines(val);
  };
  const oilinessHandler = (val) => {
    setOiliness(val);
  };

  return (
    <div
      id="container"
      style={{
        width: '80%',
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '1rem',
        flexDirection: 'column',
        flex: 0.6,
      }}
    >
      <h2>Atualizar perfil de pele</h2>
      <Form
        onSubmit={(e) => onSubmitForm(e)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 0.5,
        }}
      >
        <Form.Row>
          <Col>
            <Form.Label>Cor da Pele</Form.Label>
            <Form.Group controlId="formGridColor">
              <Col>
                <Row>
                  {skinTypes.skin_color ? (
                    <DynamicSelect
                      aria-required="true"
                      required
                      data={skinTypes.skin_color}
                      default={initialColor}
                      handleSelect={colorHandler}
                    ></DynamicSelect>
                  ) : (
                    <Form.Control></Form.Control>
                  )}
                </Row>
              </Col>
            </Form.Group>
            <Form.Label>Acne</Form.Label>
            <Form.Group controlId="formGridAcne">
              <Col>
                <Row>
                  {skinTypes.skin_acne ? (
                    <DynamicSelect
                      aria-required="true"
                      required
                      data={skinTypes.skin_acne}
                      default={initialAcne}
                      handleSelect={acneHandler}
                    ></DynamicSelect>
                  ) : (
                    <Form.Control></Form.Control>
                  )}
                </Row>
              </Col>
            </Form.Group>
            <Form.Label>Linhas da pele</Form.Label>
            <Form.Group controlId="formGridLines">
              <Col>
                <Row>
                  {skinTypes.skin_lines ? (
                    <DynamicSelect
                      aria-required="true"
                      required
                      data={skinTypes.skin_lines}
                      default={initiaLines}
                      handleSelect={linesHandler}
                    ></DynamicSelect>
                  ) : (
                    <Form.Control></Form.Control>
                  )}
                </Row>
              </Col>
            </Form.Group>
            <Form.Label>Oleosidade</Form.Label>
            <Form.Group controlId="formGridOiliness">
              <Col>
                <Row>
                  {skinTypes.skin_oiliness ? (
                    <DynamicSelect
                      aria-required="true"
                      required
                      data={skinTypes.skin_oiliness}
                      default={initialOiliness}
                      handleSelect={oilinessHandler}
                    ></DynamicSelect>
                  ) : (
                    <Form.Control></Form.Control>
                  )}
                </Row>
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
        <Row style={{ display: 'flex', flexDirection: 'row', flex: 0.2, justifyContent: 'center' }}>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button variant="primary" type="submit">
              Atualizar Perfil
            </Button>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default ProfilePage;
