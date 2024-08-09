import { ethers } from "ethers";
import Token from "./abi.json";

const contractAddress = "0x7e95d5172f2F41AeF9644630a894587A9a7E03Ec";

let provider;
let signer;

// Check if Petra Wallet is installed
if (window.petra) {
  provider = new ethers.providers.Web3Provider(window.petra);
} 
// Check if MetaMask is installed
else if (window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} 
else {
  throw new Error("No wallet provider found. Please install Petra Wallet or MetaMask.");
}

signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, Token, signer);

export const CreateEvent = async (ipfsHash, totalTickets, ticketPrice) => {
  try {
    const eventData = await contract.createEvent(ipfsHash, totalTickets, ethers.utils.parseEther(ticketPrice),{value:1});
    return eventData;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const events = await contract.getAllEvents();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const BuyTicket = async (eventId, tokenUri, ticketPrice) => {
  try {
    const ticketPriceInWei = ethers.utils.parseEther(ticketPrice);
    const eventData = await contract.purchaseTicket(eventId, tokenUri, { value: ticketPriceInWei});
    return eventData;
  } catch (error) {
    console.error("Error buying ticket:", error);
    throw error;
  }
};

export const getMyTickets = async () => {
  try {
    const eventData = await contract.getMyTickets();
    return eventData;
  } catch (error) {
    console.error("Error buying ticket:", error);
    throw error;
  }
};