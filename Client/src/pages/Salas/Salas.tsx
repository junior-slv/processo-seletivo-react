import React, { useEffect, useState } from "react";
import FileDownload from "js-file-download";
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
import "./Salas.css";
let id: number;
const baseURL = "http://localhost:3001/api/salas";
const postUrl = "http://localhost:3001/api/professor";

interface Sala {
  id: number;
  nome: string;
  capacidadeMesas: string;
  bloqueada: Boolean;
  gradeAulas: string;
  protocolo: string;
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
  const fileUpload = async () => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        axios.post(`${baseURL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        console.log("Nenhum documento selecionada.");
      }

      toast({
        title: "Sucesso!",
        description: "Documento enviado com sucesso!",
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
  const fetchSalas = () => {
    axios
      .get<Sala[]>(`${baseURL}/allsalas`)
      .then((response) => {
        setDados(response.data);
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
        bloqueada,
        gradeAulas,
        protocolo,
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
      fileUpload;
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
         <Box>
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
         </Box>
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
                    <Text fontWeight="bold" fontSize="lg">
                    <Box>
                      <Menu>
                          <MenuButton as={Button}>
                            Lista de Professores
                          </MenuButton>
                          <MenuList>
                            {professores.map((professor) => (
                              <MenuItem key={professor.id}>
                                {professor.nome}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                    </Box>
                    </Text>
                  </GridItem>
                  <GridItem
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <Text textAlign="center">
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
                    <Button
                      onClick={() => {
                        id = sala.id;
                        setNome(sala.nome);
                        setCapacidadeMesas(sala.capacidadeMesas);
                        setBloqueada(sala.bloqueada)
                        setGradeAulas(sala.gradeAulas);
                        setProtocolo("");
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
                    <Button
                      onClick={(e) => {
                        const imageSource = sala.gradeAulas;
                        const filename = sala.nome;
                        const link = document.createElement("a");
                        link.download = filename;
                        link.href = imageSource;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      colorScheme="purple"
                      size="sm"
                    >
                      Grade de Aulas
                    </Button>
                    <Button
                    onClick={(e) =>{
                      e.preventDefault();
                      axios({
                        url:`${baseURL}/download/${sala.protocolo}`,
                        method: "GET",
                        responseType: "blob"
                      }).then((res) => {
                        FileDownload(res.data, `${sala.protocolo}`)
                      })
                    }}
                    colorScheme="yellow"
                    size="sm"
                    >Protocólo</Button>
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
                    onChange={(value) => {
                      setSelectedValue(value)
                      setBloqueada(value === "1" ? true : false)
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    defaultValue="1"
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
                    type="file"
                    id="image-uploader"
                    accept="image/*"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const files = event.target.files;
                      if (files && files[0]) {
                        const reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = () => {
                          const base64String = reader.result?.toString();
                          if (base64String) {
                            setGradeAulas(base64String);
                          }
                        };
                      }
                    }}
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
                    type="file"
                    id="image-uploader"
                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFile(event.target.files?.[0] ?? null);
                      const file = event.target.files?.[0] ?? null;
                      setFile(file);
                      if (file) {
                        setProtocolo(file.name);
                      }
                    }}
                  />
                  <Button onClick={fileUpload}>ENVIAR</Button>
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
