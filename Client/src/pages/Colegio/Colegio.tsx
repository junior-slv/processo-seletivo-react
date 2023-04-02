import React, { useEffect, useState } from "react";
import "./Colegio.css";
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
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
let id: number, nome: string, cidade: string, estado: string, simbolo: string;
const postUrl = "http://localhost:3001/api/colegios";
interface Colegio {
  id: number;
  nome: string;
  estado: string;
  cidade: string;
  simbolo: string;
}

const Colegio = () => {
  const [dados, setDados] = useState<Colegio[]>([]);
  const [formToggle, setFormToggle] = useState(false);
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [simbolo, setSimbolo] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchColegios();
  }, []);

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="colegio-container">
      <Sidebar />
      <div className="colegio-content">
        <Input
          type="button"
          value="Adicionar colégio"
          onClick={() => {
            setFormToggle(!formToggle);
            setSelectedItemId(null);
          }}
        />
        {formToggle && (
          <div>
            <Input
              type="text"
              name=""
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              type="text"
              name=""
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <Input
              type="text"
              name=""
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
            <Input
              type="text"
              name=""
              value={simbolo}
              onChange={(e) => setSimbolo(e.target.value)}
            />
            <Button onClick={onOpen}>Adicionar colégio</Button>
          </div>
        )}
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Nome</Th>
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
                  <span>
                    <i onClick={isOpen} className="bx bx-edit"></i>
                  </span>
                  <span>
                    <i className="bx bx-trash"></i>
                  </span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Colegio;
