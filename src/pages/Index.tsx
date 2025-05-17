
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import QRCode from "@/components/QRCode";
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

    if ((messageType === "audio" || messageType === "video") && !file) {
      toast.error(`Por favor, faça o upload de um ${messageType === "audio" ? "áudio" : "vídeo"}.`);
      return;
    }

    // In a real app, this would send data to a backend or state management system
    toast.success("Mensagem enviada com sucesso! Aguardando aprovação.");
    
    // Reset form
    setMessage("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex flex-col items-center py-10 px-4 md:px-8 relative">
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Envie sua mensagem para o telão</h1>
        <p className="text-white/80 text-lg">Compartilhe seus pensamentos, sons ou vídeos com o público!</p>
      </header>

      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-purple-800">Nova Mensagem</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="text" 
            onValueChange={setMessageType}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="text">Texto</TabsTrigger>
              <TabsTrigger value="audio">Áudio</TabsTrigger>
              <TabsTrigger value="video">Vídeo</TabsTrigger>
            </TabsList>

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

            <TabsContent value="audio">
              <FileUploader 
                accept="audio/*"
                onFileSelected={setFile}
                selectedFile={file}
                label="Arraste seu arquivo de áudio ou clique para fazer upload"
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
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg py-6"
          >
            Comprar Mensagem
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

      <div className="fixed bottom-6 right-6 z-50">
        <QRCode url="https://enviemensagens.com.br" size={120} />
      </div>
    </div>
  );
};

export default Index;
