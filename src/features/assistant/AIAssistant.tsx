import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { FinancialFootprint } from '@/types';
import { getMockResponse } from './mockResponses';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  result: FinancialFootprint;
}

const PROMPT_CHIPS = [
  'What recurring expenses did you detect?',
  'Show all insurance premiums.',
  'Which transactions require attention?',
];

export function AIAssistant({ result }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
    };

    const response = getMockResponse(text, result);
    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: response,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <Card data-testid="ai-assistant">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages */}
        <div className="max-h-72 space-y-3 overflow-y-auto rounded-md border border-border bg-muted/20 p-4">
          {messages.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              Ask me about the financial footprint analysis. Try one of the suggestions below.
            </p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex gap-2',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.role === 'assistant' && (
                <Bot className="mt-1 h-4 w-4 shrink-0 text-primary" />
              )}
              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-line',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground'
                )}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <User className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt chips */}
        <div className="flex flex-wrap gap-2">
          {PROMPT_CHIPS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              data-testid="assistant-prompt-chip"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about the financial footprint..."
            data-testid="assistant-input"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim()}
            data-testid="assistant-send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
