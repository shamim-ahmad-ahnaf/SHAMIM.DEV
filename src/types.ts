export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  category: 'Web' | 'AI' | 'Mobile' | 'Blockchain';
  github?: string;
  live?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Tools' | 'Database' | 'Soft Skills';
  isCore?: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'education' | 'work' | 'project';
}
