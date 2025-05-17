
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { FileUploader } from "@/components/FileUploader";
import { toast } from "sonner";

const Index = () => {
  const [messageType, setMessageType] = useState("text");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(10);
  const [file, setFile] = useState<File | null>(null);

  const handleSendMessage = () => {
    // Simulating message sending/purchase
    if (messageType === "text" && !message) {
      toast.error("Por favor, digite uma mensagem.");
      return;
    }

    if ((messageType === "image" || messageType === "video") && !file) {
      toast.error(`Por favor, faça o upload de ${messageType === "image" ? "uma imagem" : "um vídeo"}.`);
      return;
    }

    // In a real app, this would send data to a backend or state management system
    toast.success("Mensagem enviada com sucesso! Aguardando aprovação.");

    fetch("https://big-screen-backend.onrender.com/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(
        { 
          type: 'text',
          content: message,
          duration
        }
      ),
    });
    
    // Reset form
    setMessage("");
    setFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 md:px-8 relative" id="container" style={{background: 'linear-gradient(to right, #4cf2ff, #ff6300)'}}>
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Envie sua mensagem para o telão</h1>
        <p className="text-white/80 text-lg">Compartilhe seus pensamentos, imagens ou vídeos com o público!</p>
      </header>

      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl" style={{color: '#E57B38'}}>Nova Mensagem</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="text" 
            onValueChange={setMessageType}
            className="w-full"
          >
            {/* <TabsList className="grid grid-cols-1 mb-6">
              <TabsTrigger value="text">Texto</TabsTrigger>
              <TabsTrigger value="image">Imagem</TabsTrigger>
              <TabsTrigger value="video">Vídeo</TabsTrigger>
            </TabsList> */}

            <TabsContent value="text">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="message">Sua mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Digite sua mensagem aqui..."
                    className="min-h-32"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="image">
              <FileUploader 
                accept="image/*"
                onFileSelected={setFile}
                selectedFile={file}
                label="Arraste sua imagem ou clique para fazer upload"
              />
            </TabsContent>

            <TabsContent value="video">
              <FileUploader 
                accept="video/*"
                onFileSelected={setFile}
                selectedFile={file}
                label="Arraste seu arquivo de vídeo ou clique para fazer upload"
              />
            </TabsContent>

            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="duration">Duração da exibição (segundos): {duration}</Label>
                <Slider 
                  id="duration" 
                  defaultValue={[10]}
                  min={5}
                  max={30}
                  step={1}
                  className="mt-2"
                  onValueChange={(values) => setDuration(values[0])}
                />
              </div>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            onClick={handleSendMessage}
            className="w-full text-lg py-6"
            style={{ background: '#E57B38' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#c45d13')}
            onMouseLeave={e => (e.currentTarget.style.background = '#E57B38')}
          >
            Enviar Mensagem
          </Button>
          <div className="text-sm text-center text-gray-500">
            Sua mensagem será exibida após aprovação e confirmação do pagamento
          </div>
        </CardFooter>
      </Card>

      <div className="mt-6">
        <Link to="/telao" className="text-white hover:underline">
          <Button variant="secondary">Visualizar Telão</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
