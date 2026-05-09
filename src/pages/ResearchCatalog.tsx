import { useState, useMemo } from 'react';
import { Search, Filter, FlaskConical, ArrowLeft, Clock, Pill, CalendarDays, Thermometer, FileText, ExternalLink, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Header from '@/sections/Header';
import { useProtocols, type Protocol } from '@/hooks/useProtocols';

interface ProtocolCardProps {
  protocol: Protocol;
  onClick: (p: Protocol) => void;
}

function ProtocolCard({ protocol, onClick }: ProtocolCardProps) {
  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col cursor-pointer"
      onClick={() => onClick(protocol)}
    >
      {/* Header band */}
      <div className="bg-gradient-to-br from-accent-light/60 to-white px-5 pt-5 pb-3 border-b border-gray-50">
        {protocol.category && (
          <span className="inline-block text-[11px] font-medium text-secondary bg-accent-light px-2.5 py-1 rounded-full mb-2 w-fit border border-accent">
            {protocol.category}
          </span>
        )}
        <h3 className="font-semibold text-primary text-sm leading-snug group-hover:text-secondary transition-colors">
          {protocol.name}
        </h3>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col gap-2.5 text-xs">
        {protocol.dosage && (
          <div className="flex items-start gap-2">
            <Pill className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
            <span className="text-muted-foreground"><span className="font-medium text-primary">Dose:</span> {protocol.dosage}</span>
          </div>
        )}
        {protocol.frequency && (
          <div className="flex items-start gap-2">
            <Clock className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
            <span className="text-muted-foreground"><span className="font-medium text-primary">Frequency:</span> {protocol.frequency}</span>
          </div>
        )}
        {protocol.duration && (
          <div className="flex items-start gap-2">
            <CalendarDays className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
            <span className="text-muted-foreground"><span className="font-medium text-primary">Duration:</span> {protocol.duration}</span>
          </div>
        )}
        {protocol.storage && (
          <div className="flex items-start gap-2">
            <Thermometer className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
            <span className="text-muted-foreground"><span className="font-medium text-primary">Storage:</span> {protocol.storage}</span>
          </div>
        )}
        {protocol.notes && protocol.notes.length > 0 && (
          <p className="text-muted-foreground mt-1 line-clamp-2">{protocol.notes[0]}</p>
        )}

        <div className="flex-1" />

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          {protocol.file_url ? (
            <span className="flex items-center gap-1 text-[10px] text-secondary font-medium">
              <FileText className="w-3 h-3" /> File attached
            </span>
          ) : (
            <span />
          )}
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium group-hover:text-secondary transition-colors">
            View details <ChevronDown className="w-3 h-3 -rotate-90" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ResearchCatalog() {
  const { protocols, loading } = useProtocols();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'order'>('order');
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);

  const activeProtocols = useMemo(() =>
    protocols.filter(p => p.active),
    [protocols]
  );

  const sortedProtocols = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const filtered = activeProtocols.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.dosage?.toLowerCase().includes(q) ||
      p.notes?.some(n => n.toLowerCase().includes(q))
    );
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'category': return (a.category ?? '').localeCompare(b.category ?? '');
        case 'order': return a.sort_order - b.sort_order;
        default: return 0;
      }
    });
  }, [activeProtocols, searchQuery, sortBy]);

  const categories = useMemo(() =>
    [...new Set(activeProtocols.map(p => p.category).filter(Boolean))],
    [activeProtocols]
  );

  return (
    <div className="min-h-screen bg-white flex flex-col" id="research-catalog">
      <Header />

      {/* Protocol detail sheet */}
      {selectedProtocol && (
        <Sheet open={!!selectedProtocol} onOpenChange={(open) => !open && setSelectedProtocol(null)}>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl">
            <div className="mx-auto w-12 h-1.5 bg-gray-200 rounded-full mt-2" />
            <SheetHeader className="px-4">
              <div className="flex items-start gap-3 mt-2">
                <div className="flex-1">
                  {selectedProtocol.category && (
                    <span className="inline-block text-[11px] font-medium text-secondary bg-accent-light px-2.5 py-1 rounded-full mb-2 border border-accent">
                      {selectedProtocol.category}
                    </span>
                  )}
                  <SheetTitle className="text-xl text-primary">{selectedProtocol.name}</SheetTitle>
                </div>
              </div>
              <SheetDescription className="sr-only">Protocol details</SheetDescription>
            </SheetHeader>

            <div className="max-w-2xl mx-auto w-full px-4 pb-8 space-y-4 mt-4">
              {/* Key stats grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {selectedProtocol.dosage && (
                  <div className="bg-accent-light/50 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1"><Pill className="w-3 h-3" /> Dosage</p>
                    <p className="font-semibold text-primary">{selectedProtocol.dosage}</p>
                  </div>
                )}
                {selectedProtocol.frequency && (
                  <div className="bg-accent-light/50 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> Frequency</p>
                    <p className="font-semibold text-primary">{selectedProtocol.frequency}</p>
                  </div>
                )}
                {selectedProtocol.duration && (
                  <div className="bg-accent-light/50 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Duration</p>
                    <p className="font-semibold text-primary">{selectedProtocol.duration}</p>
                  </div>
                )}
                {selectedProtocol.storage && (
                  <div className="bg-accent-light/50 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1"><Thermometer className="w-3 h-3" /> Storage</p>
                    <p className="font-semibold text-primary text-xs">{selectedProtocol.storage}</p>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedProtocol.notes && selectedProtocol.notes.length > 0 && (
                <div className="bg-accent-light/40 rounded-xl p-4 space-y-2">
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Notes</p>
                  <ul className="space-y-2">
                    {selectedProtocol.notes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-primary">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* File attachment */}
              {selectedProtocol.file_url && (
                <Button
                  variant="outline"
                  className="w-full rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white"
                  onClick={() => window.open(selectedProtocol.file_url!, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Attached Document
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}

      <main className="flex-grow">
        <div className="w-full py-16 lg:py-24 bg-gradient-to-b from-accent-light/50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light border border-accent mb-4">
                  <FlaskConical className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-xs font-semibold text-secondary tracking-widest uppercase">Research Catalog</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-3">Protocol Library</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Evidence-informed dosing frameworks for documented research compounds.
                </p>
              </div>
            </ScrollReveal>

            {/* Categories quick-filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                <button
                  onClick={() => setSearchQuery('')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    !searchQuery ? 'bg-secondary text-white border-secondary' : 'bg-white text-primary border-gray-200 hover:border-secondary hover:text-secondary'
                  }`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSearchQuery(cat!)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      searchQuery === cat ? 'bg-secondary text-white border-secondary' : 'bg-white text-primary border-gray-200 hover:border-secondary hover:text-secondary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Search and Sort */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search protocols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all placeholder-gray-400 text-primary"
                />
              </div>
              <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 border border-gray-200">
                <Filter className="text-muted-foreground w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="focus:outline-none bg-transparent font-medium text-primary text-sm"
                >
                  <option value="order">Default Order</option>
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>
            </div>

            <div className="mb-8 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground bg-accent-light px-4 py-1.5 rounded-full border border-accent">
                {sortedProtocols.length} {sortedProtocols.length === 1 ? 'Protocol' : 'Protocols'}
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-64 rounded-2xl bg-accent-light/40 animate-pulse" />
                ))}
              </div>
            ) : sortedProtocols.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-12 max-w-md mx-auto">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FlaskConical className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">No protocols found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery ? `No protocols match "${searchQuery}".` : 'No protocols available.'}
                  </p>
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-secondary font-semibold hover:text-secondary/80 transition-colors">
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                {sortedProtocols.map(protocol => (
                  <ProtocolCard
                    key={protocol.id}
                    protocol={protocol}
                    onClick={setSelectedProtocol}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
