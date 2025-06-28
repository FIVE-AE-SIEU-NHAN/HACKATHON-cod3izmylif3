import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  ExternalLink,
} from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary?: string;
  description: string;
  skills: string[];
  postedAt: string;
  isBookmarked?: boolean;
  onBookmark?: (id: string) => void;
  onApply?: (id: string) => void;
}

export function JobCard({
  id,
  title,
  company,
  companyLogo,
  location,
  type,
  salary,
  description,
  skills,
  postedAt,
  isBookmarked = false,
  onBookmark,
  onApply,
}: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-orange-500 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={companyLogo} alt={company} />
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                {company.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
                {title}
              </h3>
              <p className="text-base text-gray-600 font-medium">{company}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{postedAt}</span>
                </div>
                {salary && (
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{salary}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={type === "Remote" ? "default" : "secondary"}
              className={
                type === "Remote"
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : ""
              }
            >
              {type}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBookmark?.(id)}
              className={`p-2 ${isBookmarked ? "text-orange-600" : "text-gray-400 hover:text-orange-600"}`}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
              />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {skills.slice(0, 5).map((skill, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 5 && (
            <Badge variant="outline" className="text-xs text-gray-500">
              +{skills.length - 5} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            className="text-orange-600 border-orange-200 hover:bg-orange-50 hover:text-orange-700"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button
            size="sm"
            onClick={() => onApply?.(id)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            Apply Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
