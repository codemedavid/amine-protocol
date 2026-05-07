import { Protocol } from '../hooks/useProtocols';

// Define the shape of the AI response we expect
interface AIProtocolResponse {
    dosage: string;
    frequency: string;
    duration: string;
    notes: string[];
    storage: string;
}

export const generateProtocolWithAI = async (
    productName: string,
    description: string
): Promise<AIProtocolResponse> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error('Missing VITE_OPENAI_API_KEY in environment variables.');
    }

    const prompt = `
    Generate a medical usage protocol for the peptide product: "${productName}".
    Description: "${description}"
    
    Return ONLY a JSON object with the following fields:
    - dosage: (string) Recommended dosage (e.g., "500mcg daily")
    - frequency: (string) How often to take (e.g., "Once daily before breakfast")
    - duration: (string) detailed cycle length (e.g., "8-12 weeks")
    - notes: (array of strings) 3-5 important safety or usage notes
    - storage: (string) Storage instructions (e.g., "Refrigerate after reconstitution")
    
    Ensure the tone is professional but clear. Do not include markdown formatting or extra text, just the JSON.
  `;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a medical assistant specializing in peptide protocols.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to generate protocol');
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        if (!content) {
            throw new Error('No content received from AI');
        }

        try {
            const parsed = JSON.parse(content);
            return {
                dosage: parsed.dosage || 'Consult physician',
                frequency: parsed.frequency || 'Consult physician',
                duration: parsed.duration || 'Consult physician',
                notes: Array.isArray(parsed.notes) ? parsed.notes : ['Consult physician'],
                storage: parsed.storage || 'Store in cool, dry place'
            };
        } catch (parseError) {
            console.error('Failed to parse AI response:', content);
            throw new Error('Invalid response format from AI');
        }

    } catch (error) {
        console.error('AI Generation Error:', error);
        throw error;
    }
};
