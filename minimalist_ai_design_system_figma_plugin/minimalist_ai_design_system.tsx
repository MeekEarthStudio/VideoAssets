import { ChangeEvent, ReactNode, useState } from 'react';
import {
  Send,
  Sparkles,
  Settings,
  Search,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Menu,
} from 'lucide-react';

type TypographyProps = {
  children: ReactNode;
  className?: string;
};

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';

type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ElementType<{ className?: string }>;
  className?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ElementType<{ className?: string }>;
  className?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface BadgeProps {
  children: ReactNode;
  variant?: 'neutral' | 'accent' | 'success';
  className?: string;
}

interface ColorSwatchProps {
  name: string;
  hex: string;
  className?: string;
}

const Heading1 = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`font-serif text-4xl md:text-5xl font-medium tracking-tight text-stone-900 ${className}`}>
    {children}
  </h1>
);

const Heading2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`font-serif text-2xl md:text-3xl font-medium text-stone-900 ${className}`}>
    {children}
  </h2>
);

const Heading3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`font-sans text-lg font-semibold text-stone-900 tracking-wide ${className}`}>
    {children}
  </h3>
);

const TextBody = ({ children, className = '' }: TypographyProps) => (
  <p className={`font-sans text-base text-stone-700 leading-relaxed ${className}`}>
    {children}
  </p>
);

const TextSmall = ({ children, className = '' }: TypographyProps) => (
  <p className={`font-sans text-sm text-stone-500 ${className}`}>
    {children}
  </p>
);

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 active:scale-[0.98]';

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-stone-900 text-stone-50 hover:bg-stone-800 rounded-xl',
    secondary: 'bg-stone-200 text-stone-900 hover:bg-stone-300 rounded-xl',
    outline: 'border border-stone-300 bg-transparent text-stone-900 hover:bg-stone-100 rounded-xl',
    ghost: 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900 rounded-xl',
    accent: 'bg-[#D97757] text-white hover:bg-[#C26547] rounded-xl',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-base px-4 py-2 gap-2',
    lg: 'text-lg px-6 py-3 gap-2',
    icon: 'p-2 rounded-full',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon && <Icon className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />}
      {children}
    </button>
  );
};

const Input = ({ icon: Icon, className = '', ...props }: InputProps) => (
  <div className="relative flex items-center w-full">
    {Icon && (
      <div className="absolute left-3 text-stone-400">
        <Icon className="w-5 h-5" />
      </div>
    )}
    <input
      className={`w-full bg-white border border-stone-300 text-stone-900 rounded-xl px-4 py-2.5 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:border-stone-500 placeholder:text-stone-400 ${
        Icon ? 'pl-10' : ''
      } ${className}`}
      {...props}
    />
  </div>
);

const Textarea = ({ className = '', ...props }: TextareaProps) => (
  <textarea
    className={`w-full bg-white border border-stone-300 text-stone-900 rounded-xl px-4 py-3 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:border-stone-500 placeholder:text-stone-400 resize-y min-h-[100px] font-sans ${className}`}
    {...props}
  />
);

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white rounded-2xl border border-stone-200 shadow-sm p-6 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = 'neutral', className = '' }: BadgeProps) => {
  const variants = {
    neutral: 'bg-stone-100 text-stone-700 border-stone-200',
    accent: 'bg-[#FDF3F0] text-[#D97757] border-[#F2D8D0]',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const ColorSwatch = ({ name, hex, className = '' }: ColorSwatchProps) => (
  <div className="flex flex-col gap-2">
    <div className={`h-24 rounded-2xl w-full shadow-sm ${className}`} />
    <div>
      <p className="font-sans font-medium text-sm text-stone-900">{name}</p>
      <p className="font-sans text-xs text-stone-500">{hex}</p>
    </div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState<'components' | 'preview'>('components');
  const [chatInput, setChatInput] = useState('');

  const handleChatChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(event.target.value);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-stone-900 font-sans selection:bg-[#F2D8D0] selection:text-stone-900">
      <nav className="sticky top-0 z-10 bg-[#FAF9F7]/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#D97757]" />
          <span className="font-serif text-xl font-medium tracking-tight">Editorial UI</span>
        </div>
        <div className="flex gap-2">
          <Button variant={activeTab === 'components' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('components')}>
            System
          </Button>
          <Button variant={activeTab === 'preview' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('preview')}>
            Chat Preview
          </Button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6 md:p-12">
        {activeTab === 'components' ? (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="max-w-2xl">
              <Badge variant="accent" className="mb-4">
                Design System v1.0
              </Badge>
              <Heading1 className="mb-4">Clean, thoughtful, and typographic.</Heading1>
              <TextBody className="text-lg text-stone-600">
                A foundational design system built for AI interfaces, focusing on legibility, warmth, and a subtle editorial aesthetic.
              </TextBody>
            </header>

            <hr className="border-stone-200" />

            <section>
              <Heading2 className="mb-6">Colors</Heading2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <ColorSwatch name="Background" hex="#FAF9F7" className="bg-[#FAF9F7] border border-stone-200" />
                <ColorSwatch name="Surface" hex="#FFFFFF" className="bg-white border border-stone-200" />
                <ColorSwatch name="Stone 200" hex="#E7E5E4" className="bg-stone-200 text-stone-800" />
                <ColorSwatch name="Stone 900" hex="#1C1917" className="bg-stone-900 text-white" />
                <ColorSwatch name="Terracotta" hex="#D97757" className="bg-[#D97757] text-white" />
              </div>
            </section>

            <section>
              <Heading2 className="mb-6">Typography</Heading2>
              <Card className="space-y-8">
                <div>
                  <TextSmall className="mb-2">Heading 1 (Serif, Medium)</TextSmall>
                  <Heading1>The quick brown fox jumps.</Heading1>
                </div>
                <div>
                  <TextSmall className="mb-2">Heading 2 (Serif, Medium)</TextSmall>
                  <Heading2>The quick brown fox jumps.</Heading2>
                </div>
                <div>
                  <TextSmall className="mb-2">Heading 3 (Sans, Semibold)</TextSmall>
                  <Heading3>The quick brown fox jumps.</Heading3>
                </div>
                <div className="max-w-2xl">
                  <TextSmall className="mb-2">Body (Sans, Regular)</TextSmall>
                  <TextBody>
                    Artificial intelligence is a field of study combining computer science and robust datasets, to enable problem-solving. It also encompasses sub-fields of machine learning and deep learning.
                  </TextBody>
                </div>
              </Card>
            </section>

            <section>
              <Heading2 className="mb-6">Buttons & Badges</Heading2>
              <Card className="flex flex-col gap-8">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="accent" icon={Sparkles}>
                    Accent with Icon
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Badge variant="neutral">Draft</Badge>
                  <Badge variant="success">Completed</Badge>
                  <Badge variant="accent">AI Generated</Badge>
                </div>
              </Card>
            </section>

            <section>
              <Heading2 className="mb-6">Inputs</Heading2>
              <Card className="max-w-xl space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Standard Input</label>
                  <Input placeholder="Enter your email address..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Input with Icon</label>
                  <Input icon={Search} placeholder="Search documents..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Textarea</label>
                  <Textarea placeholder="How can I help you today?" />
                </div>
              </Card>
            </section>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto h-[80vh] flex flex-col animate-in fade-in zoom-in-95 duration-400">
            <Card className="flex-1 flex flex-col overflow-hidden p-0 rounded-2xl shadow-sm border border-stone-200/60 bg-[#FDFCFB]">
              <div className="flex items-center justify-between p-4 border-b border-stone-100 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FDF3F0] text-[#D97757] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-stone-900">Research Assistant</h3>
                    <p className="text-xs text-stone-500 font-sans">Using Standard Model</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div className="flex gap-4 justify-end">
                  <div className="bg-stone-100 rounded-2xl rounded-tr-sm px-5 py-3.5 max-w-[80%] text-stone-800">
                    <p className="font-sans text-[15px] leading-relaxed">
                      Can you analyze the lyrics to "I Miss You 2" and explain the main themes?
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-4 max-w-[85%]">
                    <div className="text-stone-800 font-sans text-[15px] leading-relaxed space-y-4">
                      <p>
                        Based on the lyrics provided, "I Miss You 2" is a deeply emotional song that explores themes of longing, regret, and the vastness of solitary grief.
                      </p>
                      <p>
                        The recurring metaphor of <strong>"outer space"</strong> and <strong>"stars"</strong> is particularly striking. The narrator feels entirely isolated, noting that "all I know is space and silence." This creates a sharp contrast between the cold emptiness of their current state and the warmth they associate with the person they are missing.
                      </p>
                      <div className="bg-white border border-stone-200 rounded-xl p-4 my-2">
                        <p className="font-serif italic text-stone-600">
                          "I miss you like stars that shine from outer space<br />
                          Wondering if earth has someone great"
                        </p>
                      </div>
                      <p>Would you like me to suggest some promotional strategies based on these lyrical themes?</p>
                    </div>

                    <div className="flex items-center gap-1 pt-2">
                      <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-700">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-700">
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-700">
                        <ThumbsDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-stone-100">
                <div className="relative">
                  <Textarea
                    placeholder="Message the assistant..."
                    className="min-h-[120px] pb-12 shadow-sm rounded-2xl bg-white focus:ring-stone-200 focus:border-stone-300"
                    value={chatInput}
                    onChange={handleChatChange}
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-stone-500 rounded-lg">
                        <Settings className="w-4 h-4 mr-1.5" />
                        Options
                      </Button>
                    </div>
                    <Button variant={chatInput.length > 0 ? 'primary' : 'secondary'} size="sm" className="rounded-lg">
                      Send
                      <Send className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p className="text-xs text-stone-400 font-sans">AI can make mistakes. Verify important information.</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
