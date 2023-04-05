import React, { useEffect, useState } from "react";
import "./Professores.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Text,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Box,
  Center,
  Flex,
  Square,
  ButtonGroup,
  Heading,
  Spacer,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useToast,
} from "@chakra-ui/react";
let id: number;
const postUrl = "http://localhost:3001/api/professor";
interface Professor {
  id: number;
  nome: string;
  email: string;
  idade: string;

}

const Professores = () => {
  const [dados, setDados] = useState<Professor[]>([]);
  const [formToggle, setFormToggle] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [operation, setOperation] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchProfessores();
  }, []);
  const addOnOpen = () => {
    onOpen();
    setOperation("Adicionar");
  };
  const editOnOpen = () => {
    onOpen();
    setOperation("Editar");
  };
  const fetchProfessores = () => {
    axios
      .get<Professor[]>(`${postUrl}/allprofessor`)
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const criarProfessor = async () => {
    try {
      const response = await axios.post(`${postUrl}/addprofessor`, {
        nome,
        email,
        idade
      });
      const novoProfessor = response.data;
      setDados([...dados, novoProfessor]);
      setNome("");
      setEmail("");
      setIdade("");
      onClose();
      toast({
        title: "Sucesso!",
        description: "Professor adicionado com sucesso!",
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
  const editarProfessor = async (id: number) => {
    try {
      const response = await axios.put(`${postUrl}/${id}`, {
        nome,
        email,
        idade
      });
      const professorEditado = response.data;
      setDados(
        dados.map((professor) => {
          return professor.id === professorEditado.id ? professorEditado : professor;
        })
      );
      setNome("");
      setEmail("");
      setIdade("");
      onClose();
      fetchProfessores();
      toast({
        title: "Sucesso!",
        description: "Professor editado com sucesso!",
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
  const removerProfessor = async (id: number) => {
    try {
      await axios.delete(`${postUrl}/${id}`);
      setDados(dados.filter((item) => item.id !== id));
      toast({
        title: "Sucesso!",
        description: "Professor removido com sucesso!",
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
    
    <div className="professor-container">
      <Sidebar />
      <div className="professor-content">
        <Flex minWidth="max-content" alignItems="center" gap="2" padding="1rem">
          <Box p="2">
            <Heading size="md">Gerenciador de Professores</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <Button onClick={addOnOpen} colorScheme="green">
              Adicionar professor
            </Button>
          </ButtonGroup>
        </Flex>

        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Professor</Th>
              <Th>Email</Th>
              <Th>Idade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dados.map((item) => (
              <Tr key={item.id}>
                <Td>{item.nome}</Td>
                <Td>{item.email}</Td>
                <Td>{item.idade}</Td>
                <Td>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    id = item.id;
                    setNome(item.nome);
                    setEmail(item.email);
                    setIdade(item.idade);
                    editOnOpen();
                  }}
                  colorScheme="blue"
                  size="sm"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => removerProfessor(item.id)}
                  colorScheme="red"
                  size="sm"
                >
                  Remover
                </Button>
              </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{operation} professor</ModalHeader>
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
                    Nome
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
                    Email
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Flex>
                <Flex>
                  <Text
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="1rem"
                  >
                    Idade
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
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
                  operation === "Adicionar" ? criarProfessor() : editarProfessor(id);
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

export default Professores;
