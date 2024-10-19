import getpass
import os
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage,AIMessage
import random
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# os.environ["LANGCHAIN_TRACING_V2"] = "true"
# os.environ["LANGCHAIN_API_KEY"] = getpass.getpass()

# os.environ["GROQ_API_KEY"] = getpass.getpass()

model = ChatGroq(model="llama3-8b-8192")

famous_personalities = ["Albert Einstein", "Isaac Newton", "Marie Curie", "Ada Lovelace","Virat Kohli","Mahendra Singh Dhoni","Cristiano Ronaldo","Leo Messi","Sachin Tendulkar","Shah Rukh Khan","Salman Khan","Roger Federer","Arijit Singh","Sunidhi Chauhan","Kylie Jenner","Kanye West","Narendra Modi","Rahul Gandhi","Meloni"]

thread_store = {}

def chatbot(query, threadid):
    
    if threadid not in thread_store:
        selected_personality = random.choice(famous_personalities)  
        thread_store[threadid] = {"personality": selected_personality, "messages": []}
    else:
        selected_personality = thread_store[threadid]["personality"]

    
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                f"You are playing the role of {selected_personality}. "
                "You can only answer the user's questions with 'Yes' or 'No'. "
                "The user will try to guess the personality. If the user guesses correctly, say: "
                "'Congratulations! You guessed the personality.' "
                "Otherwise, answer only 'Yes' or 'No' without additional information.Don't tell about the person to user directly answer only 'Yes' or 'No' without additional information."
            ),
            MessagesPlaceholder(variable_name="messages"),
        ]
    )

    
    conversation_history = thread_store[threadid]["messages"]

    
    conversation_history.append(HumanMessage(content=query))

    
    response = (prompt | model).invoke({"messages": conversation_history})

    
    conversation_history.append(AIMessage(content=response.content))

    
    return response.content

def personality(threadid):
    return thread_store[threadid]['personality']

def reset():
    thread_store.clear()
    return

