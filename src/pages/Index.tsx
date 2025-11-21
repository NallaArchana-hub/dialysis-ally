import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Heart, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      role: "bot",
      content: "Hello! I'm DialysisCareBot, your friendly dialysis education assistant. I'm here to help you understand dialysis treatments, lifestyle guidance, and answer general questions about kidney health.\n\n**What I can help with:**\n• Explaining dialysis procedures and types\n• Diet and lifestyle basics\n• Understanding common terms\n• Emotional support and encouragement\n\n**Important:** I cannot provide medical advice, diagnoses, or treatment decisions. Always consult your care team for personal medical questions.\n\nHow can I help you today?",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Emergency detection
    if (input.includes("emergency") || input.includes("urgent") || input.includes("911")) {
      return "If this is a medical emergency, please call 911 or go to the nearest emergency room immediately. I cannot provide emergency medical guidance.";
    }

    // Symptoms or medical decisions
    if (
      input.includes("should i") ||
      input.includes("can i skip") ||
      input.includes("medication") ||
      input.includes("pain") ||
      input.includes("symptom")
    ) {
      return "I can help explain things generally, but I can't provide medical advice, diagnosis, or treatment decisions. Please contact your dialysis nurse, nephrologist, or care team for anything specific to your health.\n\nIs there something general about dialysis I can explain instead?";
    }

    // Dialysis basics
    if (input.includes("what is dialysis") || input.includes("how does dialysis work")) {
      return "Dialysis is a treatment that does the work your kidneys can no longer do effectively. There are two main types:\n\n**Hemodialysis:** Uses a machine to filter your blood outside your body, typically done 3 times per week at a dialysis center.\n\n**Peritoneal Dialysis:** Uses the lining of your abdomen to filter blood inside your body, often done at home daily.\n\nBoth types remove waste, extra fluid, and balance minerals in your blood. Your care team will help determine which type is best for you.";
    }

    // Diet questions
    if (input.includes("diet") || input.includes("eat") || input.includes("food")) {
      return "Diet is important on dialysis. General principles include:\n\n• **Protein:** Usually encouraged (lean meats, fish, eggs)\n• **Potassium:** Often needs limiting (bananas, oranges, potatoes)\n• **Phosphorus:** Usually restricted (dairy, nuts, beans)\n• **Sodium:** Limited to control fluid and blood pressure\n• **Fluids:** Often restricted based on urine output\n\nEvery person's needs are different. Please work with your renal dietitian for personalized guidance. Would you like to know more about any specific nutrient?";
    }

    // Emotional support
    if (input.includes("tired") || input.includes("overwhelmed") || input.includes("scared") || input.includes("anxious")) {
      return "It's completely understandable to feel this way. Living with dialysis can be challenging, both physically and emotionally. Here are some things that might help:\n\n• **Connect with others:** Support groups can help you feel less alone\n• **Take it one day at a time:** Break challenges into smaller steps\n• **Celebrate small wins:** Every treatment completed is an achievement\n• **Talk to your team:** They can provide resources for mental health support\n• **Be kind to yourself:** You're doing something difficult and important\n\nYou're stronger than you know. Is there anything specific I can help explain or support you with?";
    }

    // Vascular access
    if (input.includes("fistula") || input.includes("catheter") || input.includes("access")) {
      return "Vascular access is how blood is removed and returned during hemodialysis:\n\n**AV Fistula:** A connection between an artery and vein, usually in the arm. This is the preferred long-term access.\n\n**AV Graft:** A tube connecting an artery and vein. Used when fistulas aren't possible.\n\n**Catheter:** A tube inserted into a large vein. Usually temporary.\n\nKeeping your access clean and monitoring it daily is very important. Your care team will teach you how to care for yours properly.";
    }

    // Default response
    return "That's a great question! I can help with general information about:\n\n• Dialysis types and procedures\n• Diet and lifestyle basics\n• Understanding medical terms\n• Emotional support\n• What to expect during treatment\n\nCould you tell me more about what you'd like to know? And remember, for anything specific to your personal health, always check with your care team.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">DialysisCareBot</h1>
              <p className="text-sm text-muted-foreground">Your dialysis education companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Disclaimer */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Alert className="bg-transparent border-none p-0">
            <AlertCircle className="h-4 w-4 text-accent" />
            <AlertDescription className="text-sm text-muted-foreground ml-2">
              This bot provides educational information only. Always consult your healthcare team for medical advice.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <Card
                className={`max-w-[80%] p-4 ${
                  message.role === "user"
                    ? "bg-chat-user-bg text-chat-user-fg border-none"
                    : "bg-chat-bot-bg text-chat-bot-fg border-border"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </Card>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-in fade-in">
              <Card className="max-w-[80%] p-4 bg-chat-bot-bg border-border">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about dialysis, diet, or lifestyle..."
              className="flex-1 bg-background border-border focus-visible:ring-primary"
            />
            <Button onClick={handleSend} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Remember: This is educational support, not medical advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
