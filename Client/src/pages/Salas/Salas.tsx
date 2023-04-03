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
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Box,
  ButtonGroup,
  Spacer,
  Radio,
  RadioGroup,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import operation from "antd/es/transfer/operation";
import { fetchProfessores } from "../Professores/Professores";
let id: number;
const baseURL = "http://localhost:3001/api/salas";
const postUrl = "http://localhost:3001/api/professor";

interface Sala {
  id: number;
  nome: string;
  capacidadeMesas: string;
  bloqueada: Boolean;
  gradeAulas: string;
  protocolo: Buffer;
}
interface Professor {
  id: number;
  nome: string;
  email: string;
  idade: string;
}

const Salas = () => {
  const [dados, setDados] = useState<Sala[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [capacidadeMesas, setCapacidadeMesas] = useState("");
  const [bloqueada, setBloqueada] = useState(Boolean);
  const [gradeAulas, setGradeAulas] = useState("");
  const [protocolo, setProtocolo] = useState("");
  const [operation, setOperation] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  useEffect(() => {
    fetchSalas();
    fetchProfessores();
  }, []);
  const fetchProfessores = () => {
    axios
      .get<Professor[]>(`${postUrl}/allprofessor`)
      .then((response) => {
        setProfessores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function handleDisponibilidade(value: React.SetStateAction<string>) {
    setSelectedValue(value);
    console.log(selectedValue);
  }
  const fetchSalas = () => {
    axios
      .get<Sala[]>(`${baseURL}/allsalas`)
      .then((response) => {
        setDados(response.data);
        // let prof: any = Object.values(response.data[0]?.professores);
        // setProfessores(prof);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addOnOpen = () => {
    onOpen();
    setOperation("Adicionar");
  };
  const editOnOpen = () => {
    onOpen();
    setOperation("Editar");
  };
  const editarSala = async (id: number) => {
    try {
      const response = await axios.put(`${baseURL}/${id}`, {
        nome,
        capacidadeMesas,
      });
      const salaEditada = response.data;
      setDados(
        dados.map((sala) => {
          return sala.id === salaEditada.id ? salaEditada : sala;
        })
      );

      setNome("");
      setCapacidadeMesas("");
      setBloqueada(selectedValue === "1" ? false : true);
      setGradeAulas("");
      setProtocolo("");
      onClose();
      fetchSalas();
      toast({
        title: "Sucesso!",
        description: "Colégio editado com sucesso!",
        status: "success",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro!",
        description: "Não foi possível realizar a requisição.",
        status: "error",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const criarSala = async () => {
    try {
      const response = await axios.post(`${baseURL}/addsala`, {
        nome,
        capacidadeMesas,
        bloqueada,
        gradeAulas,
        protocolo,
      });
      const novaSala = response.data;
      setDados([...dados, novaSala]);
      setNome("");
      setCapacidadeMesas("");
      setBloqueada(selectedValue === "1" ? false : true);
      setGradeAulas("");
      setProtocolo("");
      onClose();
      toast({
        title: "Sucesso!",
        description: "Colégio adicionado com sucesso!",
        status: "success",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro!",
        description: "Não foi possível realizar a requisição.",
        status: "error",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const removerSala = async (id: number) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      setDados(dados.filter((item) => item.id !== id));
      toast({
        title: "Sucesso!",
        description: "Colégio removido com sucesso!",
        status: "success",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro!",
        description: "Não foi possível realizar a requisição.",
        status: "error",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="salas-container">
      <Sidebar />
      <div className="salas-content">
        <Flex minWidth="max-content" alignItems="center" gap="2" padding="1rem">
          <Box p="2">
            <Heading size="md">Gerenciador de Salas</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <Button onClick={addOnOpen} colorScheme="green">
              Adicionar sala
            </Button>
          </ButtonGroup>
        </Flex>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
          {dados.map((sala) => (
            <Card key={sala.id}>
              <CardBody>
                <Heading as="h3" size="md" mb={2}>
                  {sala.nome}
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  <GridItem>
                    <Text fontSize="sm" color="gray.500">
                      Capacidade de Mesas
                    </Text>
                    <Text fontWeight="bold" fontSize="lg">
                      {sala.capacidadeMesas}
                    </Text>
                    {/* <Text fontSize="sm" color="gray.500">
                      Professores
                    </Text> */}
                    <Text fontWeight="bold" fontSize="lg">
                      <Menu>
                        <MenuButton as={Button}>Professores</MenuButton>
                        <MenuList>
                          {professores.map((professor) => (
                            <MenuItem key={professor.id}>
                              {professor.nome}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text>
                      {sala.bloqueada  ? (
                        <Text fontWeight="bold" fontSize="lg" color="red">
                          Ocupada
                        </Text>
                      ) : (
                        <Text fontWeight="bold" fontSize="lg" color="green">
                          Livre
                        </Text>
                      )}
                    </Text>
                    <Button
                      onClick={() => {
                        id = sala.id;
                        setNome(sala.nome);
                        setCapacidadeMesas(sala.capacidadeMesas);
                        setBloqueada(selectedValue === "1" ? false : true);
                        setGradeAulas(sala.gradeAulas);
                        setProtocolo("a");
                        editOnOpen();
                      }}
                      colorScheme="blue"
                      size="sm"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => removerSala(sala.id)}
                      colorScheme="red"
                      size="sm"
                    >
                      Remover
                    </Button>
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{operation} sala</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                <Flex>
                  <Text
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="1rem"
                  >
                    {" "}
                    Sala
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Flex>
                <Flex>
                  <Text
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="1rem"
                  >
                    Capacidade de mesas
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={capacidadeMesas}
                    onChange={(e) => setCapacidadeMesas(e.target.value)}
                  />
                </Flex>
                <Flex>
                  <Text
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="1rem"
                  >
                    Disponibilidade
                  </Text>
                  <RadioGroup
                    value={selectedValue}
                    onChange={(value) => setSelectedValue(value)}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="red" value="1">
                        Bloqueada
                      </Radio>
                      <Radio colorScheme="green" value="2">
                        Livre
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
                <Flex>
                  <Text
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="1rem"
                  >
                    Grade de Aulas
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={gradeAulas}
                    onChange={(e) => setGradeAulas(e.target.value)}
                  />
                </Flex>
                <Flex>
                  <Text
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="1rem"
                  >
                    Protocolo
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={protocolo}
                    onChange={(e) => setProtocolo(e.target.value)}
                  />
                </Flex>
              </div>
            </ModalBody>

            <ModalFooter>
              {" "}
              <Button
                colorScheme="green"
                mr={3}
                onClick={(e) => {
                  e.preventDefault();
                  operation === "Adicionar" ? criarSala() : editarSala(id);
                }}
              >
                {operation}
              </Button>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Salas;
