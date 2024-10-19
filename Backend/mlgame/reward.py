from web3 import Web3

web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))

if web3.is_connected():
    print("Connected to Ganache")


contract_address = '0xd0Ef90BE1E00E0802EB6779B882B1ca8f0Bad1Ce' 
contract_abi = [
    {
      "inputs": [],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": True,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": False,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": False,
      "inputs": [
        {
          "internalType": "address payable",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "reward",
      "outputs": [],
      "payable": True,
      "stateMutability": "payable",
      "type": "function"
    }
  ] 


contract = web3.eth.contract(address=contract_address, abi=contract_abi)


account = web3.eth.accounts[0]  

reward_address = None  

def set_account(value):
    global reward_address
    reward_address = value

def get_account():
    return reward_address


# Function to reward Ether if the final answer is correct
def reward_user(reward_amount):
    contract.functions.reward(reward_address).transact({
        'from': account,
        'value': reward_amount,
    })
    return ('Transaction Done')

def charge_fees(fees):
    contract.functions.reward(account).transact({
        'from': reward_address,
        'value': fees,
    })
    return ('Transaction Done')


