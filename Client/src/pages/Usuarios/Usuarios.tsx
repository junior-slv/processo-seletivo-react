import React, { useEffect, useState } from "react";
import "./Usuarios.css";
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
const postUrl = "http://localhost:3001/api/colegios";
interface Colegio {
  id: number;
  nome: string;
  estado: string;
  cidade: string;
  simbolo: string;
}

const Usuarios = () => {
  const [dados, setDados] = useState<Colegio[]>([]);
  const [formToggle, setFormToggle] = useState(false);
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [simbolo, setSimbolo] = useState("");
  const [operation, setOperation] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchColegios();
  }, []);
  const addOnOpen = () => {
    onOpen();
    setOperation("Adicionar");
  };
  const editOnOpen = () => {
    onOpen();
    setOperation("Editar");
  };
  const fetchColegios = () => {
    axios
      .get<Colegio[]>(`${postUrl}/allcolegios`)
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const criarColegio = async () => {
    try {
      const response = await axios.post(`${postUrl}/addcolegio`, {
        nome,
        cidade,
        estado,
        simbolo,
      });
      const novoColegio = response.data;
      setDados([...dados, novoColegio]);
      setNome("");
      setCidade("");
      setEstado("");
      setSimbolo("");
      setFormToggle(false);
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
  const editarColegio = async (id: number) => {
    try {
      const response = await axios.put(`${postUrl}/${id}`, {
        nome,
        cidade,
        estado,
        simbolo,
      });
      const colegioEditado = response.data;
      setDados(
        dados.map((colegio) => {
          return colegio.id === colegioEditado.id ? colegioEditado : colegio;
        })
      );
      setNome("");
      setCidade("");
      setEstado("");
      setSimbolo("");
      onClose();
      fetchColegios();
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

  const removerColegio = async (id: number) => {
    try {
      await axios.delete(`${postUrl}/${id}`);
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
    
    <div className="colegio-container">
      <Sidebar />
      <div className="colegio-content">
        <Flex minWidth="max-content" alignItems="center" gap="2" padding="1rem">
          <Box p="2">
            <Heading size="md">Gerenciador de Colégios</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <Button onClick={addOnOpen} colorScheme="green">
              Adicionar usuário
            </Button>
          </ButtonGroup>
        </Flex>

        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Colégio</Th>
              <Th>Cidade</Th>
              <Th>Estado</Th>
              <Th>Símbolo</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dados.map((item) => (
              <Tr key={item.id}>
                <Td>{item.nome}</Td>
                <Td>{item.cidade}</Td>
                <Td>{item.estado}</Td>
                <Td>{item.simbolo}</Td>
                <Td>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    id = item.id;
                    setNome(item.nome);
                    setCidade(item.cidade);
                    setEstado(item.estado);
                    setSimbolo(item.simbolo);
                    editOnOpen();
                  }}
                  colorScheme="blue"
                  size="sm"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => removerColegio(item.id)}
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
            <ModalHeader>{operation} colégio</ModalHeader>
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
                    Cidade
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </Flex>
                <Flex>
                  <Text
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="1rem"
                  >
                    Estado
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </Flex>

                <Flex>
                  <Text
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="1rem"
                  >
                    Simbolo
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={simbolo}
                    onChange={(e) => setSimbolo(e.target.value)}
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
                  operation === "Adicionar" ? criarColegio() : editarColegio(id);
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

export default Usuarios;
