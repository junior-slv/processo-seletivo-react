import React, { useEffect, useState } from "react";
import "./Salas.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import {
  Card,
  CardBody,
  SimpleGrid,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";

const baseURL = "http://localhost:3001/api/salas";

interface Sala {
  id: number;
  nome: string;
  capacidadeMesas: number;
  bloqueada: Boolean;
  professores: String[];
  gradeAulas: string;
  protocolo: Buffer;
}

const Salas = () => {
  const [dados, setDados] = useState<Sala[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [professores, setProfessores] = useState([])

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = () => {
    axios
      .get<Sala[]>(`${baseURL}/allsalas`)
      .then((response) => {
        setDados(response.data);
        let prof:any = Object.values((response.data)[0]?.professores)
        setProfessores(prof)
        

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="salas-container">
      <Sidebar />
      <div className="salas-content">
        <input type="button" onClick={fetchSalas} value="att"/>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
          {dados.map((sala) => (
            <Card key={sala.id}>
              <CardBody>
                <Heading as="h3" size="md" mb={2}>
                  {sala.nome}
                  {professores}
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  <GridItem>
                    <Text fontWeight="bold" fontSize="lg">
                      {sala.capacidadeMesas}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Capacidade de Mesas
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text>
                      {sala.bloqueada ? (
                        <Text fontWeight="bold" fontSize="lg" color="red">
                          Ocupada
                        </Text>
                      ) : (
                        <Text fontWeight="bold" fontSize="lg" color="green">
                          Livre
                        </Text>
                      )}
                    </Text>
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default Salas;
