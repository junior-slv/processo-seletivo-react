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
const postUrl = "http://localhost:3001/api/users";
interface Usuario {
  id: number;
  userLogin: string;
  userPassword: string;

}

const Usuarios = () => {
  const [dados, setDados] = useState<Colegio[]>([]);
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [operation, setOperation] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchUsuarios();
  }, []);
  const addOnOpen = () => {
    onOpen();
    setOperation("Adicionar");
  };
  const editOnOpen = () => {
    onOpen();
    setOperation("Editar");
  };
  const fetchUsuarios = () => {
    axios
      .get<Usuarios[]>(`${postUrl}/allusers`)
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const criarUsuario = async () => {
    try {
      const response = await axios.post(`${postUrl}/adduser`, {
        userLogin,
        userPassword

      });
      const novoUsuario = response.data;
      setDados([...dados, novoUsuario]);
      setUserLogin("");
      setUserPassword("");
      onClose();
      toast({
        title: "Sucesso!",
        description: "Usuário adicionado com sucesso!",
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


  const removerUsuario = async (id: number) => {
    try {
      await axios.delete(`${postUrl}/${id}`);
      setDados(dados.filter((item) => item.id !== id));
      toast({
        title: "Sucesso!",
        description: "Usuário removido com sucesso!",
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
    
    <div className="usuario-container">
      <Sidebar />
      <div className="usuario-content">
        <Flex minWidth="max-content" alignItems="center" gap="2" padding="1rem">
          <Box p="2">
            <Heading size="md">Gerenciador de Usuários</Heading>
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
              <Th>Usuário</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dados.map((item) => (
              <Tr key={item.id}>
                <Td>{item.userLogin}</Td>
                <Td>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    try {
                    if (item.userLogin === "admin"){
                      toast({
                        title: "Erro!",
                        description: "Não é possível remover o usuário administrador!",
                        status: "error",
                        position: "bottom-right",
                        duration: 5000,
                        isClosable: true,
                      });
                    } else{
                      removerUsuario(item.id)
                    }
                  }catch (error){
                    console.error(error);
                  }
                  }}
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
            <ModalHeader>{operation} usuário</ModalHeader>
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
                    Login
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={userLogin}
                    onChange={(e) => setUserLogin(e.target.value)}
                  />
                </Flex>
                <Flex>
                  <Text
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="1rem"
                  >
                    Senha
                  </Text>
                  <Input
                    type="text"
                    name=""
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
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
                  operation === "Adicionar" ? criarUsuario() : editarUsuario(id);
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
