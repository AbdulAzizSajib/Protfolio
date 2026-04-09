const API_URL_NEW = process.env.NEXT_PUBLIC_API_URL ?? "";

export type Profile = {
  id: string;
  userId: string;
  tagline?: string;
  bio?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  location?: string;
  website?: string;
  available?: boolean;
  github?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  dribbble?: string;
  behance?: string;
  metaTitle?: string;
  metaDescription?: string;
  user?: {
    id: string;
    name: string;
    image?: string | null;
  };
};

export type Skill = {
  id: string;
  name: string;
  iconUrl: string;
  proficiency: number;
  category: string;
  sortOrder: number;
  featured: boolean;
};

export type WorkExperience = {
  id: string;
  sortOrder: number;
  period: string;
  companyLogo?: string;
  position: string;
  company: string;
  type: string;
  technologies?: string[];
  description: string;
};

type ExperienceApiItem = {
  id: string;
  sortOrder: number;
  company: string;
  role: string;
  description: string;
  logoUrl?: string | null;
  employmentType?: string | null;
  locationType?: string | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
};

export type About = {
  id: string;
  key: string;
  title: string;
  subtitle: string;
  description: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  clientsWorkedWith: number;
  imageUrl?: string;
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  title: string;
  thumbnail: string;
  liveLink: string;
  technologies?: string[];
  description: string;
  gallery: string[];
};

type ProjectApiImage =
  | string
  | {
      url?: string;
      imageUrl?: string;
    };

type ProjectApiSkill =
  | string
  | {
      name?: string;
      title?: string;
    };

type ProjectApiItem = {
  title: string;
  description?: string;
  coverImage?: string;
  liveUrl?: string;
  sortOrder?: number;
  skills?: ProjectApiSkill[];
  tags?: string[];
  images?: ProjectApiImage[];
};

export async function getProfile(): Promise<Profile | null> {
  try {
    const res = await fetch(`${API_URL_NEW}/profile`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data ?? null;
  } catch {
    console.error("Failed to fetch profile");
    return null;
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(`${API_URL_NEW}/skills?limit=100`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.data ?? []).sort(
      (a: Skill, b: Skill) => a.sortOrder - b.sortOrder,
    );
  } catch {
    console.error("Failed to fetch skills");
    return [];
  }
}

export async function getExperiences(): Promise<WorkExperience[]> {
  try {
    if (!API_URL_NEW) {
      console.error("NEXT_PUBLIC_API_URL is not configured");
      return [];
    }

    const experiencesUrl = `${API_URL_NEW}/experiences?limit=10`;

    const res = await fetch(experiencesUrl, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();

    const formatPeriod = (
      startDate: string,
      endDate?: string | null,
      current?: boolean,
    ) => {
      const start = new Date(startDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (current) {
        return `${start} - Present`;
      }

      if (!endDate) {
        return start;
      }

      const end = new Date(endDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      return `${start} - ${end}`;
    };

    const experiences: ExperienceApiItem[] = data?.data ?? [];

    return experiences
      .map((experience) => ({
        id: experience.id,
        sortOrder: experience.sortOrder,
        period: formatPeriod(
          experience.startDate,
          experience.endDate,
          experience.current,
        ),
        companyLogo: experience.logoUrl ?? undefined,
        position: experience.role,
        company: experience.company,
        type:
          experience.employmentType ??
          experience.locationType?.replace(/_/g, " ") ??
          "Experience",
        technologies: [],
        description: experience.description,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    console.error("Failed to fetch experiences");
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    if (!API_URL_NEW) {
      console.error("NEXT_PUBLIC_API_URL is not configured");
      return [];
    }

    const res = await fetch(`${API_URL_NEW}/projects?limit=10`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();

    const projects: ProjectApiItem[] = data?.data ?? [];

    return projects
      .map((project) => {
        const galleryImages = (project.images ?? [])
          .map((image) => {
            if (typeof image === "string") return image;
            return image?.url || image?.imageUrl || "";
          })
          .filter(Boolean);

        const thumbnail = project.coverImage ?? galleryImages[0] ?? "";

        const technologiesFromSkills = (project.skills ?? [])
          .map((skill) => {
            if (typeof skill === "string") return skill;
            return skill?.name || skill?.title || "";
          })
          .filter(Boolean);

        return {
          title: project.title,
          thumbnail,
          liveLink: project.liveUrl ?? "#",
          technologies:
            technologiesFromSkills.length > 0
              ? technologiesFromSkills
              : project.tags ?? [],
          description: project.description ?? "",
          gallery:
            galleryImages.length > 0
              ? galleryImages
              : thumbnail
                ? [thumbnail]
                : [],
          sortOrder: project.sortOrder ?? Number.MAX_SAFE_INTEGER,
        };
      })
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(({ sortOrder: _sortOrder, ...project }) => project);
  } catch {
    console.error("Failed to fetch projects");
    return [];
  }
}

export async function getAbout(): Promise<About | null> {
  try {
    if (!API_URL_NEW) {
      console.error("NEXT_PUBLIC_API_URL is not configured");
      return null;
    }

    const res = await fetch(`${API_URL_NEW}/about`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data ?? null;
  } catch (error) {
    console.error("Failed to fetch about information", error);
    return null;
  }
}
