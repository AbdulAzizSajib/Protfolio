import { getProfile, getSkills, getExperiences, getProjects } from "../src/lib/api";
import Intro from "../src/Components/Pages/Intro/Intro";
import Myself from "../src/Components/Pages/mySelf/Myself";
import Projects from "../src/Components/Pages/Projects/Projects";
import Contact from "../src/Components/Pages/Contact/Contact";

export default async function Page() {
  const [profile, skills, experiences, projects] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperiences(),
    getProjects(),
  ]);

  return (
    <div>
      <Intro profile={profile} skills={skills} />
      <Myself experiences={experiences} />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
}
