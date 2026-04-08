import { getProfile, getSkills, getExperiences, getProjects } from "../src/lib/api";
import Intro from "../src/Components/Pages/Intro/Intro";
import About from "../src/Components/Pages/About/About";
import Stack from "../src/Components/Pages/Stack/Stack";
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
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-12 lg:mt-16 ">
      <About profile={profile} />
      <Stack skills={skills} />       
      </div>
      <Myself experiences={experiences} />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
}
